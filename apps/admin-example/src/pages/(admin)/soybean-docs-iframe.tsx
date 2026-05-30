import { createFileRoute, useMatch } from '@tanstack/react-router';

import { IframePage } from '@/features/router/components/IframePage';

const ROUTE_PATH = '/(admin)/soybean-docs-iframe';

const SoybeanDocsIframe = () => {
  const { staticData } = useMatch({ from: ROUTE_PATH });

  return <IframePage title={staticData.title} url={staticData.url} />;
};

export const Route = createFileRoute(ROUTE_PATH)({
  component: SoybeanDocsIframe,
  staticData: {
    menu: {
      icon: 'mdi:book-open-page-variant-outline',
      order: 31
    },
    title: 'Soybean Docs Iframe',
    url: 'https://docs.soybeanjs.cn/zh/guide/intro.html'
  }
});
