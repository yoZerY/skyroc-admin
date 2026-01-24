# @skyroc/web-table

> Ant Design 表格功能增强 - Web 专用

## 📦 包信息

- **包名**: `@skyroc/web-table`
- **版本**: `1.0.0`
- **平台**: Web Only
- **依赖**:
  - `antd` - Ant Design 组件库
  - `@dnd-kit/core` - 拖拽核心
  - `@dnd-kit/sortable` - 可排序
  - `@skyroc/web-router` - URL 参数同步

## 🎯 职责定位

**核心职责**:
- 提供完整的表格解决方案
- 数据获取和分页管理
- URL 参数同步
- 列管理（显示/隐藏）
- 拖拽排序
- 移动端适配

## 📐 目录结构

```
@skyroc/web-table/
├── src/
│   ├── hooks/
│   │   ├── use-table.ts         # 主Hook
│   │   ├── use-hook-table.ts    # 核心Hook
│   │   ├── use-table-scroll.ts  # 滚动Hook
│   │   └── use-table-operate.ts # 操作Hook
│   ├── components/
│   │   ├── TableHeaderOperation.tsx  # 表头操作
│   │   └── DragContent.tsx          # 拖拽内容
│   ├── types/
│   │   └── index.ts
│   └── index.ts
└── package.json
```

## 🔌 API 设计

### 主要导出

```ts
// Hooks
export { useTable } from './hooks/use-table'
export { useHookTable } from './hooks/use-hook-table'
export { useTableScroll } from './hooks/use-table-scroll'
export { useTableOperate } from './hooks/use-table-operate'

// Components
export { TableHeaderOperation } from './components/TableHeaderOperation'
export { DragContent } from './components/DragContent'

// Types
export type {
  TableConfig,
  TableColumn,
  TableApiFn,
  TableColumnCheck,
  CustomTableProps
} from './types'
```

### 类型定义

```ts
// src/types/index.ts
import type { TableProps, TablePaginationConfig } from 'antd'

/** 表格API函数类型 */
export type TableApiFn = (params: any) => Promise<any>

/** 表格列定义 */
export type TableColumn<T = any> = {
  key: string
  title: string
  dataIndex?: keyof T
  // ... Ant Design Column 属性
}

/** 列检查（用于显示/隐藏） */
export interface TableColumnCheck {
  key: string
  title: string
  checked: boolean
}

/** 表格配置 */
export interface TableConfig<A extends TableApiFn> {
  /** API 函数 */
  apiFn: A
  /** API 默认参数 */
  apiParams?: Partial<Parameters<A>[0]>
  /** 列定义工厂函数 */
  columns: () => TableColumn[]
  /** 是否立即加载 */
  immediate?: boolean
  /** 是否同步到 URL */
  isChangeURL?: boolean
  /** 分页配置 */
  pagination?: TablePaginationConfig
  /** Row Key */
  rowKey?: string
  /** 表格变化回调 */
  onChange?: (...args: any[]) => any
  /** 参数转换 */
  transformParams?: (params: Parameters<A>[0]) => any
}

/** 带索引的表格数据 */
export type TableDataWithIndex<T> = T & { index: number }

/** 自定义表格Props */
export interface CustomTableProps<A extends TableApiFn> extends TableProps {
  columns: TableColumn[]
  dataSource: TableDataWithIndex<any>[]
  loading: boolean
  pagination: TablePaginationConfig
}
```

## 🔨 核心实现

### 1. useTable Hook

```ts
// src/hooks/use-table.ts
import { Form } from 'antd'
import { parseQuery } from '@skyroc/web-router'
import { useRoute } from '@skyroc/web-router'
import { useHookTable } from './use-hook-table'
import type { TableConfig } from '../types'

/**
 * Ant Design 表格 Hook
 *
 * 功能:
 * - 数据获取和分页
 * - 搜索参数管理
 * - URL 参数同步
 * - 移动端适配
 * - 列管理
 */
export function useTable<A extends TableApiFn>(config: TableConfig<A>) {
  const { isMobile } = useAdminState()
  const route = useRoute()

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
  } = config

  const [form] = Form.useForm<Parameters<A>[0]>()

  // 从URL中解析查询参数
  const query = parseQuery(route.searchStr) as Parameters<A>[0]

  // 使用核心Hook
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
  } = useHookTable({
    apiFn,
    apiParams: { ...apiParams, ...query },
    columns: columnsFactory,
    getColumnChecks: (cols) => {
      return cols
        .filter(col => col.key)
        .map(col => ({
          key: col.key as string,
          title: col.title as string,
          checked: true
        }))
    },
    getColumns: (cols, checks) => {
      const columnMap = new Map(cols.map(col => [col.key, col]))
      return checks
        .filter(check => check.checked)
        .map(check => columnMap.get(check.key))
        .filter(Boolean)
    },
    immediate,
    isChangeURL,
    transformer: (res) => {
      const { current = 1, records = [], size = 10, total: totalNum = 0 } = res || {}

      const recordsWithIndex = records.map((item, index) => ({
        ...item,
        index: (current - 1) * size + index + 1
      }))

      return {
        data: recordsWithIndex,
        pageNum: current,
        pageSize: size,
        total: totalNum
      }
    },
    transformParams
  })

  // 分页配置（支持移动端）
  const pagination: TablePaginationConfig = {
    current: pageNum,
    pageSize,
    total,
    simple: isMobile,
    showSizeChanger: true,
    pageSizeOptions: ['10', '15', '20', '25', '30'],
    ...paginationConfig
  }

  // 重置搜索
  function reset() {
    form.setFieldsValue(apiParams)
    resetSearchParams()
  }

  // 执行搜索
  async function run(isResetCurrent = true) {
    const values = await form.validateFields()

    if (values) {
      if (isResetCurrent) {
        updateSearchParams({ ...values, current: 1 })
      } else {
        updateSearchParams(values)
      }
    }
  }

  // 表格变化处理
  function handleChange(...args: any[]) {
    const [paginationContext, ...otherParams] = args

    let params = {
      current: paginationContext.current,
      size: paginationContext.pageSize
    }

    if (onChangeCallback) {
      const customParams = onChangeCallback(paginationContext, ...otherParams)
      if (customParams) {
        params = customParams
      }
    }

    updateSearchParams(params)
  }

  return {
    // 状态
    columnChecks,
    data,
    empty,
    loading,
    pageNum,
    pageSize,
    pagination,
    searchParams,
    total,

    // 表单
    form,

    // 方法
    getData,
    reset,
    run,
    setColumnChecks,

    // 快捷Props
    searchProps: {
      form,
      reset,
      search: run,
      searchParams
    },
    tableProps: {
      columns,
      dataSource: data,
      loading,
      onChange: handleChange,
      pagination,
      rowKey,
      ...rest
    }
  }
}
```

### 2. useHookTable (核心逻辑)

```ts
// src/hooks/use-hook-table.ts
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

/**
 * 核心表格Hook - 处理数据获取、分页、列管理等
 */
export function useHookTable(config) {
  const {
    apiFn,
    apiParams = {},
    columns: columnsFactory,
    getColumnChecks,
    getColumns,
    immediate = true,
    transformer,
    transformParams
  } = config

  // 数据状态
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [empty, setEmpty] = useState(false)

  // 分页状态
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  // 搜索参数
  const [searchParams, setSearchParams] = useState({
    ...apiParams,
    current: 1,
    size: 10
  })

  // 列管理
  const allColumns = useMemo(() => columnsFactory(), [columnsFactory])
  const [columnChecks, setColumnChecks] = useState(() =>
    getColumnChecks(allColumns)
  )
  const columns = useMemo(
    () => getColumns(allColumns, columnChecks),
    [allColumns, columnChecks, getColumns]
  )

  const isFirstLoad = useRef(true)

  // 获取数据
  const getData = useCallback(async () => {
    setLoading(true)

    try {
      const params = transformParams ? transformParams(searchParams) : searchParams
      const res = await apiFn(params)

      const { data: list, pageNum: current, pageSize: size, total: totalNum } =
        transformer(res)

      setData(list)
      setPageNum(current)
      setPageSize(size)
      setTotal(totalNum)
      setEmpty(list.length === 0)
    } catch (error) {
      console.error('Failed to fetch table data:', error)
      setData([])
      setEmpty(true)
    } finally {
      setLoading(false)
    }
  }, [apiFn, searchParams, transformer, transformParams])

  // 更新搜索参数
  const updateSearchParams = useCallback((params) => {
    setSearchParams(prev => ({ ...prev, ...params }))
  }, [])

  // 重置搜索参数
  const resetSearchParams = useCallback(() => {
    setSearchParams({
      ...apiParams,
      current: 1,
      size: 10
    })
  }, [apiParams])

  // 监听搜索参数变化
  useEffect(() => {
    if (isFirstLoad.current && !immediate) {
      isFirstLoad.current = false
      return
    }

    getData()
  }, [searchParams, getData, immediate])

  return {
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
  }
}
```

### 3. TableHeaderOperation 组件

```tsx
// src/components/TableHeaderOperation.tsx
import { Button, Popover, Checkbox } from 'antd'
import { SettingOutlined, ReloadOutlined } from '@ant-design/icons'
import type { TableColumnCheck } from '../types'

interface TableHeaderOperationProps {
  /** 列检查列表 */
  columnChecks: TableColumnCheck[]
  /** 列检查变化 */
  onColumnChecksChange: (checks: TableColumnCheck[]) => void
  /** 刷新 */
  onRefresh?: () => void
}

export function TableHeaderOperation({
  columnChecks,
  onColumnChecksChange,
  onRefresh
}: TableHeaderOperationProps) {
  // 处理单列切换
  function handleCheckChange(key: string, checked: boolean) {
    const newChecks = columnChecks.map(item =>
      item.key === key ? { ...item, checked } : item
    )
    onColumnChecksChange(newChecks)
  }

  // 全选/取消全选
  function handleCheckAll(checked: boolean) {
    const newChecks = columnChecks.map(item => ({ ...item, checked }))
    onColumnChecksChange(newChecks)
  }

  const checkedCount = columnChecks.filter(item => item.checked).length
  const allChecked = checkedCount === columnChecks.length
  const indeterminate = checkedCount > 0 && checkedCount < columnChecks.length

  const content = (
    <div className="w-200px">
      <div className="mb-2">
        <Checkbox
          checked={allChecked}
          indeterminate={indeterminate}
          onChange={(e) => handleCheckAll(e.target.checked)}
        >
          列展示
        </Checkbox>
      </div>
      <div className="space-y-2">
        {columnChecks.map(item => (
          <div key={item.key}>
            <Checkbox
              checked={item.checked}
              onChange={(e) => handleCheckChange(item.key, e.target.checked)}
            >
              {item.title}
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex gap-2">
      {onRefresh && (
        <Button icon={<ReloadOutlined />} onClick={onRefresh}>
          刷新
        </Button>
      )}
      <Popover content={content} title="列设置" trigger="click">
        <Button icon={<SettingOutlined />}>列设置</Button>
      </Popover>
    </div>
  )
}
```

## 💡 使用示例

### 示例 1: 基本使用

```tsx
import { useTable, TableHeaderOperation } from '@skyroc/web-table'
import { Table } from 'antd'

function UserTable() {
  const {
    tableProps,
    columnChecks,
    setColumnChecks,
    getData
  } = useTable({
    apiFn: fetchUserList,
    columns: () => [
      { key: 'id', title: 'ID', dataIndex: 'id' },
      { key: 'name', title: '姓名', dataIndex: 'name' },
      { key: 'email', title: '邮箱', dataIndex: 'email' }
    ]
  })

  return (
    <div>
      <TableHeaderOperation
        columnChecks={columnChecks}
        onColumnChecksChange={setColumnChecks}
        onRefresh={getData}
      />
      <Table {...tableProps} />
    </div>
  )
}
```

### 示例 2: 带搜索表单

```tsx
import { useTable } from '@skyroc/web-table'
import { Form, Input, Button, Table } from 'antd'

function UserTable() {
  const {
    form,
    searchProps,
    tableProps
  } = useTable({
    apiFn: fetchUserList,
    apiParams: { status: 1 },
    columns: () => [
      // ... columns
    ]
  })

  return (
    <div>
      <Form {...searchProps.form} layout="inline">
        <Form.Item name="keyword" label="关键词">
          <Input placeholder="请输入关键词" />
        </Form.Item>
        <Form.Item>
          <Button onClick={searchProps.search}>搜索</Button>
          <Button onClick={searchProps.reset}>重置</Button>
        </Form.Item>
      </Form>

      <Table {...tableProps} />
    </div>
  )
}
```

## 📝 待补充内容

- [ ] 虚拟滚动支持
- [ ] 表格导出功能
- [ ] 高级筛选器
- [ ] 列宽调整
- [ ] 表格状态持久化
- [ ] 行选择增强
- [ ] 树形表格支持

---

**最后更新**: 2026-01-25
