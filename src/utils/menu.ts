/**
 * Menu utility functions
 */

/**
 * Get parent keys by selected menu key
 *
 * Searches through the menu tree to find the target menu and returns its parent keys
 *
 * @param menus - Menu tree
 * @param targetKey - Selected menu key
 * @returns Parent keys array
 *
 * @example
 *   const parentKeys = getParentKeysByMenuKey(menus, '/dashboard/analytics/report');
 *   // Returns: ['/dashboard', '/dashboard/analytics']
 */
export function getParentKeysByMenuKey(menus: App.Global.AdminLayout.Menu[], targetKey: string): string[] {
  function findMenu(items: App.Global.AdminLayout.Menu[]): string[] | null {
    for (const item of items) {
      if (item.key === targetKey) {
        const parentKeysStr = item.parentkeys;
        return parentKeysStr ? parentKeysStr.split(',').filter(Boolean) : [];
      }

      if (item.children?.length) {
        const result = findMenu(item.children);
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
  }

  return findMenu(menus) || [];
}

/**
 * Get menu depth by menu key
 *
 * @param menus - Menu tree
 * @param targetKey - Target menu key
 * @returns Menu depth (0 if not found)
 *
 * @example
 *   const depth = getMenuDepth(menus, '/dashboard/analytics');
 *   // Returns: 2
 */
export function getMenuDepth(menus: App.Global.AdminLayout.Menu[], targetKey: string): number {
  function findMenu(items: App.Global.AdminLayout.Menu[]): number | null {
    for (const item of items) {
      if (item.key === targetKey) {
        return item.depth;
      }

      if (item.children?.length) {
        const result = findMenu(item.children);
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
  }

  return findMenu(menus) || 0;
}

/**
 * Build a flat map for fast menu lookup
 *
 * Converts the menu tree into a Map for O(1) lookup performance
 *
 * @param menus - Menu tree
 * @returns Map<menuKey, menu>
 *
 * @example
 *   const menuMap = buildMenuMap(menus);
 *   const menu = menuMap.get('/dashboard');
 */
export function buildMenuMap(menus: App.Global.AdminLayout.Menu[]): Map<string, App.Global.AdminLayout.Menu> {
  const map = new Map<string, App.Global.AdminLayout.Menu>();

  function traverse(items: App.Global.AdminLayout.Menu[]) {
    items.forEach(item => {
      map.set(item.key, item);
      if (item.children?.length) {
        traverse(item.children);
      }
    });
  }

  traverse(menus);
  return map;
}

/**
 * Get parent keys using menu map (faster for multiple lookups)
 *
 * Uses a pre-built menu map for O(1) lookup performance
 *
 * @param menuMap - Pre-built menu map from buildMenuMap
 * @param targetKey - Target menu key
 * @returns Parent keys array
 *
 * @example
 *   const menuMap = buildMenuMap(menus);
 *   const parentKeys = getParentKeysByMenuMap(menuMap, '/dashboard/analytics');
 */
export function getParentKeysByMenuMap(menuMap: Map<string, App.Global.AdminLayout.Menu>, targetKey: string): string[] {
  const menu = menuMap.get(targetKey);
  return menu?.parentkeys?.split('-') || [];
}

/**
 * Get menu depth using menu map
 *
 * @param menuMap - Pre-built menu map from buildMenuMap
 * @param targetKey - Target menu key
 * @returns Menu depth (0 if not found)
 */
export function getMenuDepthByMap(menuMap: Map<string, App.Global.AdminLayout.Menu>, targetKey: string): number {
  const menu = menuMap.get(targetKey);
  return menu?.depth || 0;
}
