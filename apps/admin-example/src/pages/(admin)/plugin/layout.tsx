import { Outlet, createFileRoute } from '@tanstack/react-router';

const PluginLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/(admin)/plugin')({
  component: PluginLayout,
  staticData: {
    i18nKey: 'route.plugin',
    menu: {
      extra: 'NewFeature',
      icon: 'clarity:plugin-line',
      order: 7
    },
    title: 'plugin'
  }
});
