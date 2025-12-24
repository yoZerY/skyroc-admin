import { useEffect } from 'react';

import { useAdminTab } from './use-admin-tab';

/**
 * Admin Tab Effect Component
 *
 * This component handles tab caching on page unload
 * and should be mounted in the admin layout
 */
export function AdminTabEffect() {
  const { cacheTabs } = useAdminTab();

  useEffect(() => {
    const handleBeforeUnload = () => {
      cacheTabs();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cacheTabs]);

  return null;
}
