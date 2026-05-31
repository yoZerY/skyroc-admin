import { useAdminState } from '@skyroc/web-admin-layouts';
import { SvgIcon, TableHeaderOperation, useTable, useTableOperate, useTableScroll } from '@skyroc/web-ui-compose';
import type { TableColumn, TableDataWithIndex, TableOperateType } from '@skyroc/web-ui-compose';
import { createFileRoute, useLocation, useNavigate } from '@tanstack/react-router';
import { Button, Card, Collapse, Popconfirm, Table, Tag } from 'antd';
import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';

import MenuSearch from './modules/MenuSearch';
import {
  collectMenuBranchIds,
  createDefaultMenuFormModel,
  createMenuFormModel,
  enableStatusTagColorRecord,
  filterMenuListResponse,
  flattenMenuOptions,
  flattenRoutePathOptions,
  getMenuSearchInitialParams,
  menuRecord,
  menuTypeTagColorRecord,
  normalizeMenuSearchParams
} from './modules/shared';
import type { MenuSearchParams } from './modules/shared';

const MenuOperateDrawer = lazy(() => import('./modules/MenuOperateDrawer'));

const MENU_TABLE_SCROLL_X = 1160;

type MenuTableRecord = TableDataWithIndex<Api.SystemManage.Menu>;

const MenuManage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate({ from: '/manage/menu/' });
  const location = useLocation();
  const { isMobile } = useAdminState();
  const { scrollConfig, tableWrapperRef } = useTableScroll(MENU_TABLE_SCROLL_X);

  const { columnChecks, data, getData, searchProps, setColumnChecks, tableProps } = useTable({
    apiFn: fetchMenuList,
    apiParams: getMenuSearchInitialParams(),
    columns: createColumns,
    defaultExpandAllRows: true,
    isMobile,
    onSearchParamsChange: syncSearchParams,
    pagination: false,
    queryKey: menuListQueryKey,
    routeSearch: location.searchStr,
    transformParams: normalizeMenuSearchParams
  });

  const {
    checkedRowKeys,
    editingData,
    generalPopupOperation,
    handleAdd,
    handleEdit,
    onBatchDeleted,
    onDeleted,
    rowSelection
  } = useTableOperate<MenuTableRecord>(data, getData, executeMenuAction);

  const ignoredParentIds = editingData ? collectMenuBranchIds(editingData) : new Set<number>();
  const menuOptions = flattenMenuOptions(data, ignoredParentIds);
  const routePathOptions = flattenRoutePathOptions(data);

  async function handleBatchDelete() {
    await onBatchDeleted();
  }

  async function handleDelete() {
    await onDeleted();
  }

  function handleAddMenu() {
    handleAdd();
    setMenuFormValues(createDefaultMenuFormModel());
  }

  function handleAddChildMenu(record: MenuTableRecord) {
    handleAdd();
    setMenuFormValues(
      createDefaultMenuFormModel({
        menuType: '2',
        parentId: record.id,
        status: record.status ?? '1'
      })
    );
  }

  function edit(record: MenuTableRecord) {
    handleEdit(createMenuFormModel(record) as MenuTableRecord);
  }

  function syncSearchParams(params: Partial<MenuSearchParams>) {
    navigate({
      search: _previous => params
    });
  }

  function setMenuFormValues(values: ReturnType<typeof createDefaultMenuFormModel>) {
    generalPopupOperation.form.setFieldsValue(
      values as unknown as Parameters<typeof generalPopupOperation.form.setFieldsValue>[0]
    );
  }

  function createColumns(): TableColumn<MenuTableRecord>[] {
    return [
      {
        align: 'center',
        dataIndex: 'index',
        fixed: 'left',
        key: 'index',
        minWidth: 64,
        title: t('common.index'),
        width: 64
      },
      {
        align: 'center',
        key: 'menuType',
        minWidth: 96,
        render: (_, record) => (
          <Tag color={menuTypeTagColorRecord[record.menuType]}>{t(menuRecord.type[record.menuType])}</Tag>
        ),
        title: t('page.manage.menu.menuType'),
        width: 96
      },
      {
        key: 'menuName',
        minWidth: 180,
        render: (_, record) => {
          const label = record.i18nKey ? t(record.i18nKey as I18n.I18nKey) : record.menuName;

          return (
            <div className="flex-y-center gap-8px">
              {renderMenuIcon(record)}
              <span>{label}</span>
            </div>
          );
        },
        title: t('page.manage.menu.menuName')
      },
      {
        dataIndex: 'routePath',
        key: 'routePath',
        minWidth: 180,
        title: t('page.manage.menu.routePath')
      },
      {
        dataIndex: 'routeName',
        key: 'routeName',
        minWidth: 150,
        title: t('page.manage.menu.routeName')
      },
      {
        dataIndex: 'i18nKey',
        key: 'i18nKey',
        minWidth: 180,
        title: t('page.manage.menu.i18nKey')
      },
      {
        align: 'center',
        key: 'status',
        minWidth: 96,
        render: (_, record) => {
          if (!record.status) return null;

          return <Tag color={enableStatusTagColorRecord[record.status]}>{t(menuRecord.status[record.status])}</Tag>;
        },
        title: t('page.manage.menu.menuStatus'),
        width: 96
      },
      {
        align: 'center',
        key: 'hideInMenu',
        minWidth: 96,
        render: (_, record) => renderBooleanTag(Boolean(record.hideInMenu)),
        title: t('page.manage.menu.hideInMenu'),
        width: 96
      },
      {
        align: 'center',
        dataIndex: 'order',
        key: 'order',
        minWidth: 72,
        title: t('page.manage.menu.order'),
        width: 72
      },
      {
        align: 'center',
        fixed: 'right',
        key: 'operate',
        minWidth: 240,
        render: (_, record) => (
          <div className="flex-center justify-end gap-8px">
            {record.menuType === '1' && (
              <Button ghost size="small" type="primary" onClick={() => handleAddChildMenu(record)}>
                {t('page.manage.menu.addChildMenu')}
              </Button>
            )}
            <Button size="small" onClick={() => edit(record)}>
              {t('common.edit')}
            </Button>
            <Popconfirm title={t('common.confirmDelete')} onConfirm={handleDelete}>
              <Button danger size="small">
                {t('common.delete')}
              </Button>
            </Popconfirm>
          </div>
        ),
        title: t('common.operate'),
        width: 240
      }
    ];
  }

  function renderBooleanTag(value: boolean) {
    return value ? (
      <Tag color="warning">{t('common.yesOrNo.yes')}</Tag>
    ) : (
      <Tag color="default">{t('common.yesOrNo.no')}</Tag>
    );
  }

  return (
    <div className="h-full min-h-500px flex flex-col gap-16px overflow-hidden lt-sm:overflow-auto">
      <Collapse
        bordered={false}
        className="card-wrapper"
        defaultActiveKey={isMobile ? undefined : '1'}
        items={[
          {
            children: <MenuSearch {...searchProps} />,
            key: '1',
            label: t('common.search')
          }
        ]}
      />

      <div className="min-h-0 flex flex-1 flex-col" ref={tableWrapperRef}>
        <Card
          className="min-h-0 flex flex-1 flex-col card-wrapper"
          extra={
            <TableHeaderOperation
              add={handleAddMenu}
              columns={columnChecks}
              disabledDelete={checkedRowKeys.length === 0}
              loading={tableProps.loading}
              refresh={getData}
              setColumnChecks={setColumnChecks}
              onDelete={handleBatchDelete}
            />
          }
          title={t('page.manage.menu.title')}
          variant="borderless"
        >
          <Table rowSelection={rowSelection} scroll={scrollConfig} size="small" {...tableProps} />
          <Suspense fallback={null}>
            <MenuOperateDrawer
              {...generalPopupOperation}
              menuOptions={menuOptions}
              routePathOptions={routePathOptions}
            />
          </Suspense>
        </Card>
      </div>
    </div>
  );
};

async function executeMenuAction(_values: MenuTableRecord, _operateType: TableOperateType) {
  await Promise.resolve();
}

async function fetchMenuList(params: MenuSearchParams) {
  const { fetchGetMenuList } = await import('@/service/api/system-manage/api');
  const response = await fetchGetMenuList();

  return filterMenuListResponse(response, params);
}

function menuListQueryKey(params: MenuSearchParams) {
  return ['systemManage', 'menuList', params] as const;
}

function renderMenuIcon(record: MenuTableRecord) {
  if (!record.icon) return null;

  return (
    <SvgIcon
      className="text-icon text-primary"
      icon={record.iconType === '1' ? record.icon : undefined}
      localIcon={record.iconType === '2' ? record.icon : undefined}
    />
  );
}

export const Route = createFileRoute('/(admin)/manage/menu/')({
  component: MenuManage,
  staticData: {
    i18nKey: 'route.manage_menu',
    menu: {
      icon: 'material-symbols:account-tree-outline',
      order: 3
    },
    permissions: ['R_ADMIN'],
    title: 'menu'
  },
  validateSearch: validateMenuSearch
});

function validateMenuSearch(search: Record<string, unknown>): Partial<MenuSearchParams> {
  return normalizeMenuSearchParams({
    current: search.current as MenuSearchParams['current'],
    menuName: search.menuName as MenuSearchParams['menuName'],
    menuType: search.menuType as MenuSearchParams['menuType'],
    routePath: search.routePath as MenuSearchParams['routePath'],
    size: search.size as MenuSearchParams['size'],
    status: search.status as MenuSearchParams['status']
  });
}
