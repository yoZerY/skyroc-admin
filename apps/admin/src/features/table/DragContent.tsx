import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Checkbox } from 'antd';
import type { FC } from 'react';

import type { TableColumnCheck } from './types';

interface DragContentProps {
  columns: TableColumnCheck[];
  setColumnChecks: (checks: TableColumnCheck[]) => void;
}

interface SortableItemProps {
  index: number;
  item: TableColumnCheck;
  onCheckChange: (checked: boolean, index: number) => void;
}

/**
 * 单个可拖拽列项组件
 */
const SortableItem: FC<SortableItemProps> = ({ index, item, onCheckChange }) => {
  // 使用 useSortable 获取拖拽属性
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.key // 每个可拖拽对象的唯一标识
  });

  // 拖拽时的样式
  const style: React.CSSProperties = {
    opacity: isDragging ? 0.5 : 1,
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      className="flex items-center h-36px rd-4px px-8px hover:bg-primary hover:bg-opacity-10 transition-colors"
      style={style}
      {...attributes}
    >
      {/* 拖拽手柄 - 使用项目的图标系统 */}
      <span
        className="mr-8px cursor-move text-icon flex items-center"
        {...listeners}
      >
        <IconMdiDrag />
      </span>

      {/* 复选框 */}
      <Checkbox
        checked={item.checked}
        className="flex-1"
        onChange={e => onCheckChange(e.target.checked, index)}
      >
        {item.title}
      </Checkbox>
    </div>
  );
};

/**
 * 列设置拖拽内容组件
 * 
 * 支持：
 * - 列的显示/隐藏切换
 * - 拖拽排序
 * - 流畅的交互动画
 */
const DragContent: FC<DragContentProps> = ({ columns, setColumnChecks }) => {
  // 配置传感器，优化拖拽体验
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8 // 移动8px后才触发拖拽，避免误触
      }
    })
  );

  /**
   * 拖拽结束时的回调
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    // 如果拖拽开始和结束位置的 id 不同，则表示有重新排序
    if (active.id !== over.id) {
      const oldIndex = columns.findIndex(item => item.key === active.id);
      const newIndex = columns.findIndex(item => item.key === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        // arrayMove 是 DnD Kit 提供的辅助函数，用于在数组中移动元素
        const newColumns = arrayMove(columns, oldIndex, newIndex);
        setColumnChecks(newColumns);
      }
    }
  };

  /**
   * 点击复选框时更改"checked"状态
   */
  const handleCheckChange = (checked: boolean, index: number) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], checked };
    setColumnChecks(newColumns);
  };

  return (
    <div className="w-200px max-h-400px overflow-y-auto">
      {/* DndContext 相当于顶层的拖拽环境容器 */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {/*
          SortableContext 用于告诉 DnD Kit，这个区域内的一组元素可以"排序"；
          items 传入当前这批可排序对象的 key（或整个对象，但 key 必须唯一）；
          strategy 指定排序策略，如 verticalListSortingStrategy 适合竖直列表。
        */}
        <SortableContext items={columns.map(item => item.key)} strategy={verticalListSortingStrategy}>
          {columns.map((item, index) => (
            <SortableItem index={index} item={item} key={item.key} onCheckChange={handleCheckChange} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DragContent;

