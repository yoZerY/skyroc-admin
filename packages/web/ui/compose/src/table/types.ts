import type { TablePaginationConfig, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';

/** 表格列定义 */
export type TableColumn<T = any> = ColumnsType<T>[number];

/** 表格列检查项 */
export interface TableColumnCheck {
  /** 是否选中 */
  checked: boolean;
  /** 列的唯一标识 */
  key: string;
  /** 列标题 */
  title: string;
}

/** 分页数据 */
export interface PaginationData<T = any> {
  /** 数据列表 */
  data: T[];
  /** 当前页码 */
  pageNum: number;
  /** 每页条数 */
  pageSize: number;
  /** 总条数 */
  total: number;
}

/** 表格API函数类型 */
export type TableApiFn = (params: any) => Promise<Api.Common.PaginatingQueryRecord<any>>;

/** 提取表格数据类型 */
export type GetTableData<A extends TableApiFn> = Awaited<ReturnType<A>>['records'][number];

/** 带索引的表格数据 */
export type TableDataWithIndex<T> = T & { index: number };

/** 表格操作类型 */
export type TableOperateType = 'add' | 'edit';

/** 表格基础数据类型 */
export interface TableData {
  id: number | string;
  [key: string]: any;
}

/** 表格变化回调参数 */
export type TableOnChange = Parameters<NonNullable<TableProps<any>['onChange']>>;

/** 表格配置 */
export interface TableConfig<A extends TableApiFn> {
  /** API请求函数 */
  apiFn: A;
  /** API请求参数 */
  apiParams?: Partial<Parameters<A>[0]>;
  /** 表格列配置工厂函数 */
  columns: () => TableColumn<TableDataWithIndex<GetTableData<A>>>[];
  /** 是否立即请求数据 */
  immediate?: boolean;
  /** 是否使用移动端分页展示 */
  isMobile?: boolean;
  /** 是否读取 URL 查询参数初始化表格参数 */
  isChangeURL?: boolean;
  /** 表格变化回调 */
  onChange?: (...args: TableOnChange) => Partial<Parameters<A>[0]> | void;
  /** 分页配置 */
  pagination?: TablePaginationConfig;
  /** 行key */
  rowKey?: string | ((record: TableDataWithIndex<GetTableData<A>>) => string);
  /** 用于初始化表格查询参数的 URL 查询字符串 */
  routeSearch?: string;
  /** 参数转换函数 */
  transformParams?: (params: Parameters<A>[0]) => any;
}

/** 自定义表格Props */
export type CustomTableProps<A extends TableApiFn> = Omit<
  TableProps<TableDataWithIndex<GetTableData<A>>>,
  'loading'
> & {
  loading: boolean;
};

/** 表格搜索Props */
export interface TableSearchProps<T = any> {
  /** Form实例 */
  form: any;
  /** 重置搜索 */
  reset: () => void;
  /** 执行搜索 */
  search: (isResetCurrent?: boolean) => Promise<void>;
  /** 搜索参数 */
  searchParams: T;
}

/** 通用弹窗操作Props */
export interface GeneralPopupOperationProps {
  /** Form实例 */
  form: any;
  /** 提交处理 */
  handleSubmit: () => Promise<void>;
  /** 关闭回调 */
  onClose: () => void;
  /** 是否打开 */
  open: boolean;
  /** 操作类型 */
  operateType: TableOperateType;
}
