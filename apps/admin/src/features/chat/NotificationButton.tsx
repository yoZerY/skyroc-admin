import { Dropdown } from 'antd';
import clsx from 'clsx';
import type { CSSProperties } from 'react';

import { ButtonIcon } from '@skyroc/ui-antd';

import './notification.css';
import NotificationPanel from './NotificationPanel';
import { useNotificationContext } from './NotificationProvider';

interface Props {
  className?: string;
  style?: CSSProperties;
}

const NotificationButton: FC<Props> = memo(({ className, style }) => {
  const { t } = useTranslation();

  const { clearAllNotifications, markAllAsRead, markAsRead, notifications, removeNotification, unreadCount } =
    useNotificationContext();

  const [open, setOpen] = useState(false);

  // 是否有未读通知
  const hasUnread = unreadCount > 0;

  // 未读数量显示（最多99+）
  const displayCount = unreadCount > 99 ? '99+' : unreadCount;

  // 动画类名：有未读时摇摆，无未读时缩放
  const hoverAnimation = hasUnread ? 'swing' : 'scale';

  // 处理下拉菜单打开/关闭
  const handleOpenChange = (visible: boolean) => {
    setOpen(visible);
  };

  // 点击通知项
  const handleNotificationClick = (id: string) => {
    markAsRead(id);
    // 可以在这里添加跳转逻辑
  };

  // 删除通知
  const handleDelete = (id: string) => {
    removeNotification(id);
  };

  // 全部已读
  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  // 清空所有
  const handleClearAll = () => {
    clearAllNotifications();
    setOpen(false);
  };

  return (
    <Dropdown
      open={open}
      placement="bottomRight"
      trigger={['click']}
      popupRender={() => (
        <NotificationPanel
          notifications={notifications}
          unreadCount={unreadCount}
          onClearAll={handleClearAll}
          onDelete={handleDelete}
          onItemClick={handleNotificationClick}
          onMarkAllRead={handleMarkAllRead}
        />
      )}
      onOpenChange={handleOpenChange}
    >
      <ABadge
        count={displayCount}
        offset={[-4, 4]}
        overflowCount={99}
        size="small"
        styles={{
          indicator: {
            boxShadow: hasUnread ? '0 0 0 1px var(--ant-color-bg-container)' : undefined
          }
        }}
      >
        <ButtonIcon
          className={clsx(hasUnread ? 'notification-button-unread' : '', className)}
          hoverAnimation={hoverAnimation}
          icon="carbon:notification"
          style={style}
          tooltipContent={t('notification.title')}
        />
      </ABadge>
    </Dropdown>
  );
});

export default NotificationButton;
