import { Empty, List, Tag } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { ButtonIcon } from '@skyroc/ui-antd';
import { DarkModeContainer } from '@skyroc/ui-compose';

import type { NotificationItem, NotificationType } from './types';

dayjs.extend(relativeTime);

interface Props {
  notifications: NotificationItem[];
  onClearAll: () => void;
  onDelete: (id: string) => void;
  onItemClick: (id: string) => void;
  onMarkAllRead: () => void;
  unreadCount: number;
}

// 通知类型配置
const NOTIFICATION_TYPE_CONFIG: Record<
  NotificationType,
  {
    color: string;
    icon: string;
  }
> = {
  error: {
    color: 'red',
    icon: 'carbon:close-filled'
  },
  info: {
    color: 'blue',
    icon: 'carbon:information-filled'
  },
  message: {
    color: 'purple',
    icon: 'carbon:chat'
  },
  success: {
    color: 'green',
    icon: 'carbon:checkmark-filled'
  },
  warning: {
    color: 'orange',
    icon: 'carbon:warning-filled'
  }
};

/** 单个通知项 */
interface NotificationItemProps {
  item: NotificationItem;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItemComponent: FC<NotificationItemProps> = memo(({ item, onClick, onDelete }) => {
  const config = NOTIFICATION_TYPE_CONFIG[item.type];

  const handleClick = () => {
    onClick(item.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(item.id);
  };

  let priorityColor: 'default' | 'orange' | 'red' = 'default';
  if (item.priority === 'urgent') {
    priorityColor = 'red';
  } else if (item.priority === 'high') {
    priorityColor = 'orange';
  }

  return (
    <List.Item
      className={clsx(
        'cursor-pointer transition-all hover:bg-$ant-color-fill-quaternary px-16px! py-12px!',
        !item.read && 'bg-$ant-color-primary-bg'
      )}
      onClick={handleClick}
    >
      <div className="w-full flex gap-12px">
        {/* 类型图标 */}
        <div className="shrink-0 pt-2px">
          <span className={`text-${config.color} text-24px`}>
            <span className={config.icon} />
          </span>
        </div>

        {/* 内容 */}
        <div className="min-w-0 flex-1">
          <div className="mb-4px flex-y-center gap-8px">
            <h4 className="m-0 flex-1 truncate text-14px font-semibold">{item.title}</h4>
            {!item.read && (
              <div
                className="h-8px w-8px shrink-0 rounded-full bg-$ant-color-primary"
                title="未读"
              />
            )}
          </div>

          <p className="line-clamp-2 m-0 text-13px text-$ant-color-text-secondary">{item.content}</p>

          <div className="mt-8px flex-y-center justify-between">
            <span className="text-12px text-$ant-color-text-tertiary">{dayjs(item.timestamp).fromNow()}</span>

            {item.priority && item.priority !== 'normal' && (
              <Tag
                bordered={false}
                color={priorityColor}
              >
                {item.priority}
              </Tag>
            )}
          </div>
        </div>

        {/* 删除按钮 */}
        <div className="shrink-0">
          <ButtonIcon
            className="h-24px! w-24px!"
            hoverAnimation="rotate"
            icon="carbon:close"
            onClick={handleDelete}
          />
        </div>
      </div>
    </List.Item>
  );
});

const NotificationPanel: FC<Props> = memo(
  ({ notifications, onClearAll, onDelete, onItemClick, onMarkAllRead, unreadCount }) => {
    const { t } = useTranslation();

    return (
      <DarkModeContainer className="w-400px rounded-8px shadow-md">
        {/* 头部 */}
        <div className="flex-y-center justify-between border-b border-$ant-color-border px-16px py-12px">
          <div className="flex-y-center gap-8px">
            <h3 className="m-0 text-16px font-semibold">{t('notification.title')}</h3>
            {unreadCount > 0 && (
              <ABadge
                count={unreadCount}
                overflowCount={99}
                showZero={false}
              />
            )}
          </div>

          <div className="flex-y-center gap-8px">
            {unreadCount > 0 && (
              <AButton
                size="small"
                type="text"
                onClick={onMarkAllRead}
              >
                {t('notification.markAllRead')}
              </AButton>
            )}
            {notifications.length > 0 && (
              <AButton
                danger
                size="small"
                type="text"
                onClick={onClearAll}
              >
                {t('notification.clearAll')}
              </AButton>
            )}
          </div>
        </div>

        {/* 通知列表 */}
        <div className="max-h-500px overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-40px">
              <Empty
                description={t('notification.empty')}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          ) : (
            <List
              dataSource={notifications}
              size="small"
              renderItem={item => (
                <NotificationItemComponent
                  item={item}
                  onClick={onItemClick}
                  onDelete={onDelete}
                />
              )}
            />
          )}
        </div>
      </DarkModeContainer>
    );
  }
);

export default NotificationPanel;
