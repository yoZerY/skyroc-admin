import { LookForward } from '@skyroc/web-ui-compose';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/user-center')({
  component: UserCenter,
  staticData: {
    title: 'user_center',
    i18nKey: 'route.user-center',
    menu: {
      hide: true
    }
  }
});

function UserCenter() {
  const { t } = useTranslation();

  return <LookForward title={t('common.lookForward')} />;
}
