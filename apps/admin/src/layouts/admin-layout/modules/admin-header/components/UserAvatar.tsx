import { useLocation, useNavigate } from '@tanstack/react-router';
import type { MenuProps } from 'antd';

import { useAuth } from '@/features/auth/use-auth';
import { useUserInfoQuery } from '@/service/api';

const UserAvatar = memo(() => {
  const { isLoggedIn } = useAuth();

  const { data: userInfo } = useUserInfoQuery();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const location = useLocation();

  const fullPath = location.pathname + location.search + location.hash;

  function logout() {
    showConfirmModal({
      cancelText: t('common.cancel'),
      content: t('common.logoutConfirm'),
      okText: t('common.confirm'),
      onOk: () => {
        navigate({ to: '/login-out', query: { redirect: fullPath } });
      },
      title: t('common.tip')
    });
  }

  function onClick({ key }: { key: string }) {
    if (key === '1') {
      logout();
    } else {
      navigate({ to: '/user-center' });
    }
  }

  function loginOrRegister() {
    navigate({ to: '/login' });
  }

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <div className="flex-center gap-8px">
          <SvgIcon
            className="text-icon"
            icon="ph:user-circle"
          />
          {t('common.userCenter')}
        </div>
      )
    },
    {
      type: 'divider'
    },
    {
      key: '1',
      label: (
        <div className="flex-center gap-8px">
          <SvgIcon
            className="text-icon"
            icon="ph:sign-out"
          />
          {t('common.logout')}
        </div>
      )
    }
  ];

  if (isLoggedIn) {
    return (
      <ADropdown
        menu={{ items, onClick }}
        placement="bottomRight"
        trigger={['click']}
      >
        <div>
          <ButtonIcon className="px-12px">
            <SvgIcon
              className="text-icon-large"
              icon="ph:user-circle"
            />
            <span className="text-16px font-medium">{userInfo?.userName}</span>
          </ButtonIcon>
        </div>
      </ADropdown>
    );
  }

  return <AButton onClick={loginOrRegister}>{t('page.login.common.loginOrRegister')}</AButton>;
});

export default UserAvatar;
