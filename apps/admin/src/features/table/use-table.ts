import { Form } from 'antd';
import type { TablePaginationConfig } from 'antd';

import { parseQuery } from '@/features/router/query';
import { useRoute } from '@/features/router/use-route';
import { useAdminState } from '@/layouts/admin-layout/state/use-admin-state';

import { useHookTable } from './hooks';
import type {
  CustomTableProps,
  GetTableData,
  TableApiFn,
  TableColumn,
  TableColumnCheck,
  TableConfig,
  TableDataWithIndex,
  TableOnChange
} from './types';

/**
 * Antd表格Hook
 *
 * 提供完整的表格功能，包括： - 数据获取和分页 - 搜索参数管理 - URL参数同步 - 移动端适配 - 列管理
 */
export function useTable<A extends TableApiFn>(config: TableConfig<A>) {
  const { isMobile } = useAdminState();
  const route = useRoute();

  const {
    apiFn,
    apiParams,
    columns: columnsFactory,
    immediate = true,
    isChangeURL = true,
    onChange: onChangeCallback,
    pagination: paginationConfig,
    rowKey = 'id',
    transformParams,
    ...rest
  } = config;

  const [form] = Form.useForm<Parameters<A>[0]>();

  // 从URL中解析查询参数
  const query = parseQuery(route.searchStr) as unknown as Parameters<A>[0];

  // 使用核心Hook处理表格逻辑
  const {
    columnChecks,
    columns,
    data,
    empty,
    getData,
    loading,
    pageNum,
    pageSize,
    resetSearchParams,
    searchParams,
    setColumnChecks,
    total,
    updateSearchParams
  } = useHookTable<A, GetTableData<A>, TableColumn<TableDataWithIndex<GetTableData<A>>>>({
    apiFn,
    apiParams: { ...apiParams, ...query },
    columns: columnsFactory,
    getColumnChecks: cols => {
      const checks: TableColumnCheck[] = [];

      cols.forEach(column => {
        if (column.key) {
          checks.push({
            checked: true,
            key: column.key as string,
            title: column.title as string
          });
        }
      });

      return checks;
    },
    getColumns: (cols, checks) => {
      const columnMap = new Map<string, TableColumn<TableDataWithIndex<GetTableData<A>>>>();

      cols.forEach(column => {
        if (column.key) {
          columnMap.set(column.key as string, column);
        }
      });

      const filteredColumns = checks.filter(item => item.checked).map(check => columnMap.get(check.key));

      return filteredColumns as TableColumn<TableDataWithIndex<GetTableData<A>>>[];
    },
    immediate,
    isChangeURL,
    transformer: res => {
      const { current = 1, records = [], size = 10, total: totalNum = 0 } = res || {};

      const recordsWithIndex = records.map((item, index) => {
        return {
          ...item,
          index: (current - 1) * size + index + 1
        };
      });

      return {
        data: recordsWithIndex,
        pageNum: current,
        pageSize: size,
        total: totalNum
      };
    },
    transformParams
  });

  // 分页配置（支持移动端）
  const pagination: TablePaginationConfig = {
    current: pageNum,
    pageSize,
    pageSizeOptions: ['10', '15', '20', '25', '30'],
    showSizeChanger: true,
    simple: isMobile,
    total,
    ...paginationConfig
  };

  /** 重置搜索 */
  function reset() {
    form.setFieldsValue(apiParams as NonNullable<Parameters<A>[0]>);
    resetSearchParams();
  }

  /** 执行搜索 */
  async function run(isResetCurrent: boolean = true) {
    const res = await form.validateFields();

    if (res) {
      if (isResetCurrent) {
        const { current: _current, ...other } = res;
        updateSearchParams({ current: 1, ...other });
      } else {
        updateSearchParams(res);
      }
    }
  }

  /** 表格变化处理（分页、排序、筛选） */
  function handleChange(...args: TableOnChange) {
    const [paginationContext, ...otherParams] = args;

    let other: Parameters<A>[0] = {
      current: paginationContext.current,
      size: paginationContext.pageSize
    } as Parameters<A>[0];

    if (onChangeCallback) {
      const params = onChangeCallback(paginationContext, ...otherParams);
      if (params) {
        other = params as Parameters<A>[0];
      }
    }

    updateSearchParams(other);
  }

  return {
    columnChecks,
    data,
    empty,
    form,
    getData,
    loading,
    pageNum,
    pageSize,
    pagination,
    reset,
    run,
    searchParams,
    searchProps: {
      form,
      reset,
      search: run,
      searchParams: searchParams as NonNullable<Parameters<A>[0]>
    },
    setColumnChecks,
    tableProps: {
      columns,
      dataSource: data,
      loading,
      onChange: handleChange,
      pagination,
      rowKey,
      ...rest
    } as CustomTableProps<A>,
    total
  };
}
