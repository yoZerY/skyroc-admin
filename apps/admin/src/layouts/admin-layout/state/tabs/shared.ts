/**
 * Get all tabs
 *
 * @param tabs Tabs
 * @param homeTab Home tab
 */
export function getAllTabs(tabs: App.Global.Tab[], homeTab?: App.Global.Tab) {
  if (!homeTab) {
    return [];
  }

  const filterHomeTabs = tabs.filter(tab => tab.id !== homeTab.id);

  const fixedTabs = filterHomeTabs.filter(isFixedTab).sort((a, b) => a.fixedIndex! - b.fixedIndex!);

  const remainTabs = filterHomeTabs.filter(tab => !isFixedTab(tab));

  const allTabs = [homeTab, ...fixedTabs, ...remainTabs];

  return updateTabsLabel(allTabs);
}

/**
 * Is fixed tab
 *
 * @param tab
 */
function isFixedTab(tab: App.Global.Tab) {
  return tab.fixedIndex !== undefined && tab.fixedIndex !== null;
}

/**
 * Get tab id by route
 *
 * @param route
 */
export function getTabIdByRoute(route: { handle?: any; pathname: string; search?: string }) {
  const { handle, pathname, search = '' } = route;

  let id = pathname;

  if (handle?.multiTab && search) {
    id = `${pathname}${search}`;
  }

  return id;
}

/**
 * Get tab by route
 *
 * @param route
 */
export function getTabByRoute(route: {
  fullPath: string;
  handle: {
    fixedIndexInTab?: number | null;
    i18nKey?: I18n.I18nKey | null;
    icon?: string;
    localIcon?: string;
    multiTab?: boolean | null;
    title?: string;
  };
  id: string;
  pathname: string;
}) {
  const { fullPath, handle, id, pathname } = route;

  const { fixedIndexInTab, i18nKey, icon, localIcon, title = '' } = handle;

  const tab: App.Global.Tab = {
    id: handle.multiTab ? fullPath : pathname,
    label: title,
    routePath: pathname,
    fullPath,
    fixedIndex: fixedIndexInTab ?? undefined,
    icon,
    localIcon,
    i18nKey,
    oldLabel: title,
    newLabel: undefined
  };

  return tab;
}

/**
 * Is tab in tabs
 *
 * @param tabId
 * @param tabs
 */
export function isTabInTabs(tabId: string, tabs: App.Global.Tab[]) {
  return tabs.some(tab => tab.id === tabId);
}

/**
 * Filter tabs by ids
 *
 * @param tabIds
 * @param tabs
 */
export function filterTabsByIds(tabIds: string[], tabs: App.Global.Tab[]) {
  return tabs.filter(tab => !tabIds.includes(tab.id));
}

/**
 * Extract tabs by all routes
 *
 * @param routeIds All route IDs
 * @param tabs Cached tabs
 */
export function extractTabsByAllRoutes(routeIds: string[], tabs: App.Global.Tab[]) {
  return tabs.filter(tab => routeIds.includes(tab.routePath));
}

/**
 * Get fixed tabs
 *
 * @param tabs
 */
export function getFixedTabs(tabs: App.Global.Tab[]) {
  return tabs.filter(isFixedTab);
}

/**
 * Get fixed tab ids
 *
 * @param tabs
 */
export function getFixedTabIds(tabs: App.Global.Tab[]) {
  const fixedTabs = getFixedTabs(tabs);

  return fixedTabs.map(tab => tab.id);
}

/**
 * Reorder fixed tabs fixedIndex
 *
 * @param tabs
 */
export function reorderFixedTabs(tabs: App.Global.Tab[]) {
  const fixedTabs = getFixedTabs(tabs);
  fixedTabs.forEach((t, i) => {
    t.fixedIndex = i;
  });
}

/**
 * Update tabs label
 *
 * @param tabs
 */
function updateTabsLabel(tabs: App.Global.Tab[]) {
  const updated = tabs.map(tab => ({
    ...tab,
    label: tab.newLabel || tab.oldLabel || tab.label
  }));

  return updated;
}

/**
 * Update tab by i18n key
 *
 * @param tab
 */
export function updateTabByI18nKey(tab: App.Global.Tab) {
  const { i18nKey, label } = tab;

  // TODO: Add i18n translation here when i18n is ready
  // const translatedLabel = i18nKey ? $t(i18nKey) : label;

  return {
    ...tab,
    label: i18nKey ? label : label // For now, just use the existing label
  };
}

/**
 * Update tabs by i18n key
 *
 * @param tabs
 */
export function updateTabsByI18nKey(tabs: App.Global.Tab[]) {
  return tabs.map(tab => updateTabByI18nKey(tab));
}

/**
 * Find tab by route name
 *
 * @param routePath
 * @param tabs
 */
export function findTabByRoutePath(routePath: Router.RoutePath, tabs: App.Global.Tab[]) {
  const tabId = routePath;
  const multiTabId = `${routePath}?`;

  return tabs.find(tab => tab.id === tabId || tab.id.startsWith(multiTabId));
}
