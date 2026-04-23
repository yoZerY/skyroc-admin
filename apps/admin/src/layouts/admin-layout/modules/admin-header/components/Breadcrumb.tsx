import { I18nLabel, SvgIcon } from '@skyroc/web-ui-compose';
import { Link } from '@tanstack/react-router';
import type { BreadcrumbProps } from 'antd';

import { useAdminMenus } from '@/layouts/admin-layout/state/menus/use-admin-menus';

const itemRender: BreadcrumbProps['itemRender'] = (currentRoute, _, items) => {
  const isLast = currentRoute?.path === items[items.length - 1]?.path;

  return isLast ? (
    <div className="flex-y-center text-base-text">{currentRoute.title}</div>
  ) : (
    <Link className="flex-y-center hover:text-base-text!" to={currentRoute.path}>
      {currentRoute.title}
    </Link>
  );
};

const AdminBreadcrumb = () => {
  const { activeMenu, currentMenu, getMenuInfoByPath, openKeys, selectedKey } = useAdminMenus();

  const isHome = selectedKey[0] === globalConfig.defaultHome;

  const allBreadcrumb = [
    isHome ? null : globalConfig.defaultHome,
    ...openKeys,
    ...selectedKey,
    activeMenu ? currentMenu?.key : null
  ];

  const breadcrumb = allBreadcrumb
    .map(key => {
      if (!key) return null;

      const menuInfo = getMenuInfoByPath(key as Router.RoutePath);

      if (!menuInfo) return null;

      return {
        title: (
          <>
            <SvgIcon
              className="text-icon mr-4px"
              icon={menuInfo.menu?.icon || globalConfig.defaultIcon}
              localIcon={menuInfo.menu?.localIcon}
            />
            <span>
              <I18nLabel fallback={menuInfo.title} i18nKey={menuInfo.i18nKey} />
            </span>
          </>
        ),
        path: menuInfo?.path
      };
    })
    .filter(Boolean) as BreadcrumbProps['items'];

  return <ABreadcrumb className="ml-12px" itemRender={itemRender} items={breadcrumb} />;
};

export default AdminBreadcrumb;
