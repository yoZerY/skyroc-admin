import { useNotificationContext } from '@skyroc/web-admin-notification';
import { useMockNotifications } from '@skyroc/web-admin-notification/mock';
import { createFileRoute } from '@tanstack/react-router';
import { Card, Space, Tooltip } from 'antd';

export const Route = createFileRoute('/(admin)/manage/user/')({
  component: RouteComponent,
  staticData: {
    i18nKey: 'route.manage_user',
    menu: {
      icon: 'ic:round-manage-accounts',
      order: 1
    },
    permissions: ['R_ADMIN'],
    title: 'manage_user'
  }
});

function RouteComponent() {
  const {
    addErrorNotification,
    addInfoNotification,
    addMessageNotification,
    addNotification,
    addSuccessNotification,
    addWarningNotification,
    clearAllNotifications,
    clearReadNotifications,
    config,
    markAllAsRead,
    notificationPermission,
    notifications,
    requestNotificationPermission,
    unreadCount,
    updateConfig
  } = useNotificationContext();

  const { mockNotifications } = useMockNotifications();

  // 辅助函数：获取权限颜色
  const getPermissionColor = () => {
    if (notificationPermission === 'granted') return 'text-$ant-color-success';
    if (notificationPermission === 'denied') return 'text-$ant-color-warning';
    return 'text-$ant-color-info';
  };

  // 辅助函数：获取权限文本
  const getPermissionText = () => {
    if (notificationPermission === 'granted') return '✅ 已授权';
    if (notificationPermission === 'denied') return '❌ 已拒绝';
    return '⏳ 未请求';
  };

  // 添加不同类型的通知
  const handleAddInfo = () => {
    addInfoNotification('信息通知', '这是一条普通的信息通知', {
      priority: 'normal'
    });
  };

  const handleAddSuccess = () => {
    addSuccessNotification('操作成功', '您的数据已成功保存到系统中', {
      priority: 'normal'
    });
  };

  const handleAddWarning = () => {
    addWarningNotification('警告提示', '您的密码将在 7 天后过期，请及时修改', {
      priority: 'high'
    });
  };

  const handleAddError = () => {
    addErrorNotification('操作失败', '网络连接失败，请检查您的网络设置', {
      priority: 'high'
    });
  };

  const handleAddMessage = () => {
    addMessageNotification('新消息', 'Sarah 给您发送了一条新消息：你好，最近怎么样？', {
      priority: 'high'
    });
  };

  // 添加紧急通知
  const handleAddUrgent = () => {
    addNotification({
      content: '检测到异常登录行为，请立即检查您的账户安全！',
      priority: 'urgent',
      title: '🚨 安全警报',
      type: 'error'
    });
  };

  // 添加低优先级通知
  const handleAddLowPriority = () => {
    addNotification({
      content: '系统已自动完成数据备份',
      priority: 'low',
      title: '备份完成',
      type: 'success'
    });
  };

  // 添加静音通知（不播放声音）
  const handleAddSilent = () => {
    addNotification({
      content: '这是一条静音通知，不会播放声音',
      silent: true,
      title: '静音通知',
      type: 'info'
    });
  };

  // 添加不显示浏览器通知的通知
  const handleAddNoBrowser = () => {
    addNotification({
      content: '这条通知不会显示浏览器原生通知',
      showBrowserNotification: false,
      title: '仅应用内通知',
      type: 'info'
    });
  };

  // 添加带跳转链接的通知
  const handleAddWithLink = () => {
    addNotification({
      content: '点击此通知可跳转到指定页面',
      link: '/home',
      title: '带链接的通知',
      type: 'message'
    });
  };

  // 批量添加模拟通知
  const handleAddMockNotifications = () => {
    mockNotifications.forEach((mock, index) => {
      setTimeout(() => {
        addNotification(mock);
      }, index * 300); // 每300ms添加一个，形成连续效果
    });
  };

  // 请求浏览器通知权限
  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      addSuccessNotification('权限已授予', '现在您可以接收浏览器通知了');
    }
  };

  // 切换声音
  const handleToggleSound = () => {
    updateConfig({ soundEnabled: !config.soundEnabled });
    addInfoNotification('设置已更新', config.soundEnabled ? '通知声音已关闭' : '通知声音已开启');
  };

  // 切换浏览器通知
  const handleToggleBrowserNotification = () => {
    updateConfig({ browserNotificationEnabled: !config.browserNotificationEnabled });
    const message = config.browserNotificationEnabled ? '浏览器通知已关闭' : '浏览器通知已开启';
    addInfoNotification('设置已更新', message);
  };

  // 切换勿扰模式
  const handleToggleDoNotDisturb = () => {
    updateConfig({ doNotDisturb: !config.doNotDisturb });
    addInfoNotification('设置已更新', config.doNotDisturb ? '勿扰模式已关闭' : '勿扰模式已开启');
  };

  return (
    <div className="p-24px">
      <div className="mb-24px">
        <h1 className="m-0 mb-8px text-24px font-bold">🔔 通知系统演示</h1>
        <p className="m-0 text-$ant-color-text-secondary">
          完整展示通知系统的所有功能和交互细节。点击右上角通知图标查看通知面板。
        </p>
      </div>

      {/* 统计信息 */}
      <Card className="mb-24px" title="📊 当前状态">
        <Space direction="vertical" size="middle">
          <div className="flex-y-center gap-16px">
            <span className="text-$ant-color-text-secondary">总通知数：</span>
            <span className="text-20px text-$ant-color-primary font-semibold">{notifications.length}</span>
          </div>
          <div className="flex-y-center gap-16px">
            <span className="text-$ant-color-text-secondary">未读数量：</span>
            <span className="text-20px text-$ant-color-error font-semibold">{unreadCount}</span>
          </div>
          <div className="flex-y-center gap-16px">
            <span className="text-$ant-color-text-secondary">浏览器通知权限：</span>
            <span className={`text-16px font-medium ${getPermissionColor()}`}>{getPermissionText()}</span>
          </div>
          <div className="flex-y-center gap-16px">
            <span className="text-$ant-color-text-secondary">通知声音：</span>
            <span
              className={`text-16px font-medium ${config.soundEnabled ? 'text-$ant-color-success' : 'text-$ant-color-text-tertiary'}`}
            >
              {config.soundEnabled ? '🔊 开启' : '🔇 关闭'}
            </span>
          </div>
          <div className="flex-y-center gap-16px">
            <span className="text-$ant-color-text-secondary">浏览器通知：</span>
            <span
              className={`text-16px font-medium ${config.browserNotificationEnabled ? 'text-$ant-color-success' : 'text-$ant-color-text-tertiary'}`}
            >
              {config.browserNotificationEnabled ? '📢 开启' : '📴 关闭'}
            </span>
          </div>
          <div className="flex-y-center gap-16px">
            <span className="text-$ant-color-text-secondary">勿扰模式：</span>
            <span
              className={`text-16px font-medium ${config.doNotDisturb ? 'text-$ant-color-warning' : 'text-$ant-color-text-tertiary'}`}
            >
              {config.doNotDisturb ? '🌙 开启' : '☀️ 关闭'}
            </span>
          </div>
        </Space>
      </Card>

      {/* 基础通知类型 */}
      <Card className="mb-24px" title="📮 基础通知类型">
        <p className="mb-16px text-$ant-color-text-secondary">通知系统支持 5 种基础类型，每种类型有不同的图标和颜色</p>
        <Space wrap>
          <Tooltip title="信息通知">
            <AButton icon={<span className="i-carbon-information-filled" />} type="primary" onClick={handleAddInfo}>
              信息通知
            </AButton>
          </Tooltip>
          <AButton icon={<span className="i-carbon-checkmark-filled" />} type="primary" onClick={handleAddSuccess}>
            成功通知
          </AButton>
          <AButton icon={<span className="i-carbon-warning-filled" />} onClick={handleAddWarning}>
            警告通知
          </AButton>
          <AButton danger icon={<span className="i-carbon-close-filled" />} onClick={handleAddError}>
            错误通知
          </AButton>
          <AButton icon={<span className="i-carbon-chat" />} type="dashed" onClick={handleAddMessage}>
            消息通知
          </AButton>
        </Space>
      </Card>

      {/* 优先级演示 */}
      <Card className="mb-24px" title="⚡ 优先级系统">
        <p className="mb-16px text-$ant-color-text-secondary">
          支持 4 种优先级：低、普通、高、紧急。高优先级通知会显示彩色标签
        </p>
        <Space wrap>
          <AButton onClick={handleAddLowPriority}>低优先级</AButton>
          <AButton type="default" onClick={handleAddInfo}>
            普通优先级
          </AButton>
          <AButton type="primary" onClick={handleAddWarning}>
            高优先级
          </AButton>
          <AButton danger type="primary" onClick={handleAddUrgent}>
            🚨 紧急通知
          </AButton>
        </Space>
      </Card>

      {/* 特殊功能 */}
      <Card className="mb-24px" title="🎯 特殊功能">
        <p className="mb-16px text-$ant-color-text-secondary">支持静音通知、禁用浏览器通知、带跳转链接等特殊功能</p>
        <Space wrap>
          <AButton icon={<span className="i-carbon-volume-mute" />} onClick={handleAddSilent}>
            静音通知
          </AButton>
          <AButton icon={<span className="i-carbon-notification-off" />} onClick={handleAddNoBrowser}>
            仅应用内通知
          </AButton>
          <AButton icon={<span className="i-carbon-link" />} type="dashed" onClick={handleAddWithLink}>
            带跳转链接
          </AButton>
        </Space>
      </Card>

      {/* 批量操作 */}
      <Card className="mb-24px" title="🎬 批量操作">
        <p className="mb-16px text-$ant-color-text-secondary">一次性添加多条通知，或批量管理现有通知</p>
        <Space wrap>
          <AButton icon={<span className="i-carbon-add-alt" />} type="primary" onClick={handleAddMockNotifications}>
            批量添加 8 条模拟通知
          </AButton>
          <AButton disabled={unreadCount === 0} icon={<span className="i-carbon-checkmark" />} onClick={markAllAsRead}>
            全部标记已读
          </AButton>
          <AButton
            disabled={notifications.filter(n => n.read).length === 0}
            icon={<span className="i-carbon-clean" />}
            onClick={clearReadNotifications}
          >
            清除已读通知
          </AButton>
          <AButton
            danger
            disabled={notifications.length === 0}
            icon={<span className="i-carbon-trash-can" />}
            onClick={clearAllNotifications}
          >
            清空所有通知
          </AButton>
        </Space>
      </Card>

      {/* 设置控制 */}
      <Card title="⚙️ 设置控制">
        <p className="mb-16px text-$ant-color-text-secondary">控制通知的声音、浏览器通知和勿扰模式</p>
        <Space wrap>
          {notificationPermission !== 'granted' && (
            <AButton icon={<span className="i-carbon-notification" />} type="primary" onClick={handleRequestPermission}>
              请求浏览器通知权限
            </AButton>
          )}
          <AButton
            icon={<span className={config.soundEnabled ? 'i-carbon-volume-up' : 'i-carbon-volume-mute'} />}
            onClick={handleToggleSound}
          >
            {config.soundEnabled ? '关闭声音' : '开启声音'}
          </AButton>
          <AButton
            icon={
              <span
                className={config.browserNotificationEnabled ? 'i-carbon-notification' : 'i-carbon-notification-off'}
              />
            }
            onClick={handleToggleBrowserNotification}
          >
            {config.browserNotificationEnabled ? '关闭浏览器通知' : '开启浏览器通知'}
          </AButton>
          <AButton
            icon={<span className={config.doNotDisturb ? 'i-carbon-asleep' : 'i-carbon-awake'} />}
            onClick={handleToggleDoNotDisturb}
          >
            {config.doNotDisturb ? '关闭勿扰模式' : '开启勿扰模式'}
          </AButton>
        </Space>
      </Card>

      {/* 使用提示 */}
      <Card className="mt-24px" title="💡 使用提示">
        <Space direction="vertical" size="small">
          <div className="flex gap-8px">
            <span className="text-$ant-color-primary">👉</span>
            <span>点击右上角的通知图标可以查看通知面板</span>
          </div>
          <div className="flex gap-8px">
            <span className="text-$ant-color-primary">👉</span>
            <span>有未读通知时，通知图标会持续晃动吸引注意力</span>
          </div>
          <div className="flex gap-8px">
            <span className="text-$ant-color-primary">👉</span>
            <span>未读通知会显示蓝色背景和小红点</span>
          </div>
          <div className="flex gap-8px">
            <span className="text-$ant-color-primary">👉</span>
            <span>点击通知可以标记为已读，点击删除按钮可以删除通知</span>
          </div>
          <div className="flex gap-8px">
            <span className="text-$ant-color-primary">👉</span>
            <span>浏览器通知会在屏幕右下角弹出，3秒后自动关闭</span>
          </div>
          <div className="flex gap-8px">
            <span className="text-$ant-color-primary">👉</span>
            <span>新通知到达时会播放简短的提示音（可关闭）</span>
          </div>
          <div className="flex gap-8px">
            <span className="text-$ant-color-primary">👉</span>
            <span>勿扰模式下不会播放声音和显示浏览器通知</span>
          </div>
          <div className="flex gap-8px">
            <span className="text-$ant-color-primary">👉</span>
            <span>通知面板显示相对时间（如 &ldquo;3分钟前&rdquo;），自动更新</span>
          </div>
        </Space>
      </Card>
    </div>
  );
}
