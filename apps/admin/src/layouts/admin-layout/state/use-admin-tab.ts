import { useNavigate, useRouterState } from '@tanstack/react-router';
import { atom, useAtom } from 'jotai';

import { router } from '@/features/router';
import { localStg } from '@/utils/storage';

import {
  extractTabsByAllRoutes,
  filterTabsByIds,
  getAllTabs,
  getFixedTabIds,
  getTabByRoute,
  getTabIdByRoute,
  isTabInTabs,
  reorderFixedTabs,
  updateTabByI18nKey,
  updateTabsByI18nKey
} from './tabs/shared';

interface TabState {
  /** Active tab id */
  activeTabId: string;
  /** Home tab */
  homeTab?: App.Global.Tab;
  /** All tabs (excluding home) */
  tabs: App.Global.Tab[];
}

const initialState: TabState = {
  homeTab: undefined,
  tabs: [],
  activeTabId: ''
};

const tabStateAtom = atom(initialState, (get, set, update: Partial<TabState>) => {
  set(tabStateAtom, { ...get(tabStateAtom), ...update });
});

export const useAdminTab = () => {
  const [tabState, setTabState] = useAtom(tabStateAtom);
  const navigate = useNavigate();
  const routerState = useRouterState();

  console.log(router, 'routerState');

  /**
   * Get all tabs (including home tab and reordered by fixed index)
   */
  const allTabs = getAllTabs(tabState.tabs, tabState.homeTab);

  /**
   * Set active tab id
   *
   * @param id Tab id
   */
  function setActiveTabId(id: string) {
    setTabState({ activeTabId: id });
  }

  /**
   * Init home tab
   *
   * @param homeRoute The home route path
   */
  function initHomeTab(homeRoute: Router.RoutePath) {
    const routes = routerState.matches;
    const homeRouteMatch = routes.find(route => route.pathname === homeRoute);

    if (homeRouteMatch) {
      const homeTab = getTabByRoute({
        id: homeRouteMatch.id,
        pathname: homeRouteMatch.pathname,
        fullPath: homeRouteMatch.fullPath || homeRouteMatch.pathname,
        handle: {
          title: homeRouteMatch.staticData?.title || 'Home',
          i18nKey: homeRouteMatch.staticData?.i18nKey,
          icon: homeRouteMatch.staticData?.menu?.icon,
          localIcon: homeRouteMatch.staticData?.menu?.localIcon,
          fixedIndexInTab: 0
        }
      } as any);

      setTabState({ homeTab });
    }
  }

  /**
   * Init tab store
   *
   * @param cache Whether to cache tabs
   * @param allRoutes All available route IDs for validation
   */
  function initTabStore(cache: boolean, allRoutes: string[]) {
    const storageTabs = localStg.get('globalTabs');

    if (cache && storageTabs) {
      const extractedTabs = extractTabsByAllRoutes(allRoutes, storageTabs);
      const updatedTabs = updateTabsByI18nKey(extractedTabs);
      setTabState({ tabs: updatedTabs });
    }
  }

  /**
   * Add tab
   *
   * @param route Tab route
   * @param active Whether to activate the added tab
   */
  function addTab(route: any, active = true) {
    const tab = getTabByRoute(route);

    const isHomeTab = tab.id === tabState.homeTab?.id;

    if (!isHomeTab && !isTabInTabs(tab.id, tabState.tabs)) {
      setTabState({ tabs: [...tabState.tabs, tab] });
    }

    if (active) {
      setActiveTabId(tab.id);
    }
  }

  /**
   * Remove tab
   *
   * @param tabId Tab id
   */
  async function removeTab(tabId: string) {
    const removeTabIndex = tabState.tabs.findIndex(tab => tab.id === tabId);
    if (removeTabIndex === -1) return;

    const isRemoveActiveTab = tabState.activeTabId === tabId;

    // if remove the last tab, then switch to the second last tab
    const nextTab = tabState.tabs[removeTabIndex + 1] || tabState.tabs[removeTabIndex - 1] || tabState.homeTab;

    // remove tab
    const newTabs = [...tabState.tabs];
    newTabs.splice(removeTabIndex, 1);
    setTabState({ tabs: newTabs });

    // if current tab is removed, then switch to next tab
    if (isRemoveActiveTab && nextTab) {
      await switchRouteByTab(nextTab);
    }
  }

  /**
   * Remove active tab
   */
  async function removeActiveTab() {
    await removeTab(tabState.activeTabId);
  }

  /**
   * Clear tabs
   *
   * @param excludes Exclude tab ids
   */
  async function clearTabs(excludes: string[] = []) {
    const remainTabIds = [...getFixedTabIds(tabState.tabs), ...excludes];

    const tabsToRemove = tabState.tabs.filter(tab => !remainTabIds.includes(tab.id));
    const removedTabsIds = tabsToRemove.map(tab => tab.id);

    if (removedTabsIds.length === 0) {
      return;
    }

    const isRemoveActiveTab = removedTabsIds.includes(tabState.activeTabId);
    const updatedTabs = filterTabsByIds(removedTabsIds, tabState.tabs);

    if (!isRemoveActiveTab) {
      setTabState({ tabs: updatedTabs });
    } else {
      const activeTabCandidate = updatedTabs[updatedTabs.length - 1] || tabState.homeTab;

      if (activeTabCandidate) {
        await switchRouteByTab(activeTabCandidate);
      }
      setTabState({ tabs: updatedTabs });
    }
  }

  /**
   * Switch route by tab
   *
   * @param tab
   */
  async function switchRouteByTab(tab: App.Global.Tab) {
    navigate({ to: tab.fullPath as any });
    setActiveTabId(tab.id);
  }

  /**
   * Clear left tabs
   *
   * @param tabId
   */
  async function clearLeftTabs(tabId: string) {
    const tabIds = tabState.tabs.map(tab => tab.id);
    const index = tabIds.indexOf(tabId);
    if (index === -1) return;

    const excludes = tabIds.slice(index);
    await clearTabs(excludes);
  }

  /**
   * Clear right tabs
   *
   * @param tabId
   */
  async function clearRightTabs(tabId: string) {
    const isHomeTab = tabId === tabState.homeTab?.id;
    if (isHomeTab) {
      clearTabs();
      return;
    }

    const tabIds = tabState.tabs.map(tab => tab.id);
    const index = tabIds.indexOf(tabId);
    if (index === -1) return;

    const excludes = tabIds.slice(0, index + 1);
    await clearTabs(excludes);
  }

  /**
   * Fix tab
   *
   * @param tabId
   */
  function fixTab(tabId: string) {
    const tabIndex = tabState.tabs.findIndex(t => t.id === tabId);
    if (tabIndex === -1) return;

    const newTabs = [...tabState.tabs];
    const tab = newTabs[tabIndex];
    const fixedCount = getFixedTabIds(newTabs).length;
    tab.fixedIndex = fixedCount;

    if (tabIndex !== fixedCount) {
      newTabs.splice(tabIndex, 1);
      newTabs.splice(fixedCount, 0, tab);
    }

    reorderFixedTabs(newTabs);
    setTabState({ tabs: newTabs });
  }

  /**
   * Unfix tab
   *
   * @param tabId
   */
  function unfixTab(tabId: string) {
    const tabIndex = tabState.tabs.findIndex(t => t.id === tabId);
    if (tabIndex === -1) return;

    const newTabs = [...tabState.tabs];
    const tab = newTabs[tabIndex];
    tab.fixedIndex = undefined;

    const fixedCount = getFixedTabIds(newTabs).length;
    if (tabIndex !== fixedCount) {
      newTabs.splice(tabIndex, 1);
      newTabs.splice(fixedCount, 0, tab);
    }

    reorderFixedTabs(newTabs);
    setTabState({ tabs: newTabs });
  }

  /**
   * Set new label of tab
   *
   * @default activeTabId
   * @param label New tab label
   * @param tabId Tab id
   */
  function setTabLabel(label: string, tabId?: string) {
    const id = tabId || tabState.activeTabId;

    const newTabs = [...tabState.tabs];
    const tab = newTabs.find(item => item.id === id);
    if (!tab) return;

    tab.oldLabel = tab.label;
    tab.newLabel = label;
    setTabState({ tabs: newTabs });
  }

  /**
   * Reset tab label
   *
   * @default activeTabId
   * @param tabId Tab id
   */
  function resetTabLabel(tabId?: string) {
    const id = tabId || tabState.activeTabId;

    const newTabs = [...tabState.tabs];
    const tab = newTabs.find(item => item.id === id);
    if (!tab) return;

    tab.newLabel = undefined;
    setTabState({ tabs: newTabs });
  }

  /**
   * Is tab retain (home tab or fixed tab)
   *
   * @param tabId
   */
  function isTabRetain(tabId: string) {
    if (tabId === tabState.homeTab?.id) return true;

    const fixedTabIds = getFixedTabIds(tabState.tabs);

    return fixedTabIds.includes(tabId);
  }

  /**
   * Update tabs by locale
   */
  function updateTabsByLocale() {
    const updatedTabs = updateTabsByI18nKey(tabState.tabs);
    const updatedHomeTab = tabState.homeTab ? updateTabByI18nKey(tabState.homeTab) : undefined;

    setTabState({ tabs: updatedTabs, homeTab: updatedHomeTab });
  }

  /**
   * Cache tabs to local storage
   */
  function cacheTabs() {
    localStg.set('globalTabs', tabState.tabs);
  }

  return {
    // State
    tabs: allTabs,
    activeTabId: tabState.activeTabId,
    homeTab: tabState.homeTab,

    // Actions
    initHomeTab,
    initTabStore,
    addTab,
    removeTab,
    removeActiveTab,
    clearTabs,
    clearLeftTabs,
    clearRightTabs,
    fixTab,
    unfixTab,
    switchRouteByTab,
    setTabLabel,
    resetTabLabel,
    isTabRetain,
    updateTabsByLocale,
    getTabIdByRoute,
    cacheTabs,
    setActiveTabId
  };
};
