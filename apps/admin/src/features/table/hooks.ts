import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type {
  GetTableData,
  PaginationData,
  TableApiFn,
  TableColumn,
  TableColumnCheck,
  TableDataWithIndex
} from './types';

/**
 * 核心表格Hook - 处理数据获取、分页、列管理等
 */
export function useHookTable<
  A extends TableApiFn,
  T = GetTableData<A>,
  Column = TableColumn<TableDataWithIndex<T>>
>(config: {
  apiFn: A;
  apiParams?: Partial<Parameters<A>[0]>;
  columns: () => Column[];
  getColumnChecks: (cols: Column[]) => TableColumnCheck[];
  getColumns: (cols: Column[], checks: TableColumnCheck[]) => Column[];
  immediate?: boolean;
  isChangeURL?: boolean;
  transformer: (res: Awaited<ReturnType<A>>) => PaginationData<T>;
  transformParams?: (params: Parameters<A>[0]) => any;
}) {
  const {
    apiFn,
    apiParams = {},
    columns: columnsFactory,
    getColumnChecks,
    getColumns,
    immediate = true,
    transformer,
    transformParams
  } = config;

  // 数据状态
  const [data, setData] = useState<TableDataWithIndex<T>[]>([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);

  // 分页状态
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  // 搜索参数
  const [searchParams, setSearchParams] = useState<Partial<Parameters<A>[0]>>({
    ...apiParams,
    current: 1,
    size: 10
  } as Partial<Parameters<A>[0]>);

  // 列管理
  const allColumns = useMemo(() => columnsFactory(), [columnsFactory]);
  const [columnChecks, setColumnChecks] = useState<TableColumnCheck[]>(() => getColumnChecks(allColumns));
  const columns = useMemo(() => getColumns(allColumns, columnChecks), [allColumns, columnChecks, getColumns]);

  // 是否是首次加载
  const isFirstLoad = useRef(true);

  /**
   * 获取表格数据
   */
  const getData = useCallback(async () => {
    setLoading(true);

    try {
      const params = transformParams ? transformParams(searchParams as Parameters<A>[0]) : searchParams;
      const res = await apiFn(params as Parameters<A>[0]);

      const {
        data: list,
        pageNum: current,
        pageSize: size,
        total: totalNum
      } = transformer(res as Awaited<ReturnType<A>>);

      // 为数据添加索引
      const dataWithIndex = list.map((item, index) => ({
        ...item,
        index: (current - 1) * size + index + 1
      })) as TableDataWithIndex<T>[];

      setData(dataWithIndex);
      setPageNum(current);
      setPageSize(size);
      setTotal(totalNum);
      setEmpty(dataWithIndex.length === 0);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch table data:', error);
      setData([]);
      setEmpty(true);
    } finally {
      setLoading(false);
    }
  }, [apiFn, searchParams, transformer, transformParams]);

  /**
   * 更新搜索参数
   */
  const updateSearchParams = useCallback((params: Partial<Parameters<A>[0]>) => {
    setSearchParams(prev => ({ ...prev, ...params }));
  }, []);

  /**
   * 重置搜索参数
   */
  const resetSearchParams = useCallback(() => {
    setSearchParams({
      ...apiParams,
      current: 1,
      size: 10
    } as Partial<Parameters<A>[0]>);
  }, [apiParams]);

  /**
   * 重新加载列
   */
  const reloadColumns = useCallback(() => {
    const newColumns = columnsFactory();
    const newChecks = getColumnChecks(newColumns);
    setColumnChecks(newChecks);
  }, [columnsFactory, getColumnChecks]);

  // 监听搜索参数变化，自动获取数据
  useEffect(() => {
    if (isFirstLoad.current && !immediate) {
      isFirstLoad.current = false;
      return;
    }

    getData();
  }, [searchParams, getData, immediate]);

  return {
    columnChecks,
    columns,
    data,
    empty,
    getData,
    loading,
    pageNum,
    pageSize,
    reloadColumns,
    resetSearchParams,
    searchParams,
    setColumnChecks,
    total,
    updateSearchParams
  };
}
