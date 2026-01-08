import { Button, Popconfirm, Popover, Space } from 'antd';
import type { SpaceProps } from 'antd';
import classNames from 'clsx';
import type { FC, ReactNode } from 'react';

import DragContent from './DragContent';
import type { TableColumnCheck } from './types';

interface TableHeaderOperationProps {
  /** 添加按钮点击事件 */
  add?: () => void;
  /** 自定义操作按钮（会替换默认的添加和批量删除按钮） */
  children?: ReactNode;
  /** 表格列配置 */
  columns: TableColumnCheck[];
  /** 是否禁用删除按钮 */
  disabledDelete?: boolean;
  /** Space 组件的对齐方式 */
  itemAlign?: SpaceProps['align'];
  /** 加载状态（刷新按钮图标会旋转） */
  loading?: boolean;
  /** 批量删除按钮点击事件 */
  onDelete?: () => void;
  /** 前缀内容（显示在最前面） */
  prefix?: ReactNode;
  /** 刷新按钮点击事件 */
  refresh: () => void;
  /** 更新列配置的回调 */
  setColumnChecks: (checks: TableColumnCheck[]) => void;
  /** 后缀内容（显示在最后面） */
  suffix?: ReactNode;
}

/**
 * 表格头部操作栏组件
 *
 * 提供常用的表格操作功能：
 * - 添加按钮
 * - 批量删除按钮
 * - 刷新按钮
 * - 列设置（显示/隐藏、拖拽排序）
 *
 * @example
 * ```tsx
 * <TableHeaderOperation
 *   columns={columnChecks}
 *   setColumnChecks={setColumnChecks}
 *   add={handleAdd}
 *   onDelete={handleBatchDelete}
 *   disabledDelete={checkedRowKeys.length === 0}
 *   refresh={getData}
 *   loading={loading}
 * />
 * ```
 */
const TableHeaderOperation: FC<TableHeaderOperationProps> = ({
  add,
  children,
  columns,
  disabledDelete = false,
  itemAlign,
  loading = false,
  onDelete,
  prefix,
  refresh,
  setColumnChecks,
  suffix
}) => {
  const { t } = useTranslation();

  return (
    <Space
      wrap
      align={itemAlign}
      className="lt-sm:w-200px"
    >
      {/* 前缀内容 */}
      {prefix}

      {/* 自定义操作按钮 或 默认按钮 */}
      {children || (
        <>
          {/* 添加按钮 */}
          {add && (
            <Button
              ghost
              icon={<IconIcRoundPlus className="text-icon" />}
              size="small"
              type="primary"
              onClick={add}
            >
              {t('common.add')}
            </Button>
          )}

          {/* 批量删除按钮 */}
          {onDelete && (
            <Popconfirm
              title={t('common.confirmDelete')}
              onConfirm={onDelete}
            >
              <Button
                danger
                ghost
                disabled={disabledDelete}
                icon={<IconIcRoundDelete className="text-icon" />}
                size="small"
              >
                {t('common.batchDelete')}
              </Button>
            </Popconfirm>
          )}
        </>
      )}

      {/* 刷新按钮 */}
      <Button
        size="small"
        icon={
          <IconMdiRefresh
            className={classNames('text-icon', {
              'animate-spin': loading
            })}
          />
        }
        onClick={refresh}
      >
        {t('common.refresh')}
      </Button>

      {/* 列设置 */}
      <Popover
        placement="bottomRight"
        trigger="click"
        content={
          <DragContent
            columns={columns}
            setColumnChecks={setColumnChecks}
          />
        }
      >
        <Button
          icon={<IconAntDesignSettingOutlined />}
          size="small"
        >
          {t('common.columnSetting')}
        </Button>
      </Popover>

      {/* 后缀内容 */}
      {suffix}
    </Space>
  );
};

export default TableHeaderOperation;
