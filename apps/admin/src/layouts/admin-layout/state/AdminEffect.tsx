/* eslint-disable react-hooks/exhaustive-deps */
import { useSettingsTheme } from '@/features/theme/useSettingsTheme';
import { localStg } from '@/utils/storage';

import { useAdminState } from './use-admin-state';

const AdminEffect = () => {
  const { isMobile, mixSiderFixed, setSiderCollapse, siderCollapse } = useAdminState();

  const { layout, setThemeLayout } = useSettingsTheme();

  useEffect(() => {
    if (isMobile) {
      // backup theme setting before is mobile
      localStg.set('backupThemeSettingBeforeIsMobile', {
        layout: layout.mode,
        siderCollapse
      });

      setThemeLayout('vertical');

      setSiderCollapse(true);
    } else {
      // when is not mobile, recover the backup theme setting
      const backup = localStg.get('backupThemeSettingBeforeIsMobile');

      if (backup) {
        setThemeLayout(backup.layout);

        setSiderCollapse(backup.siderCollapse);

        localStg.remove('backupThemeSettingBeforeIsMobile');
      }
    }
  }, [isMobile]);

  useEffect(() => {
    return () => {
      window.addEventListener('beforeunload', () => {
        localStg.set('mixSiderFixed', mixSiderFixed ? 'Y' : 'N');
      });
    };
  }, []);

  return null;
};

export default AdminEffect;
