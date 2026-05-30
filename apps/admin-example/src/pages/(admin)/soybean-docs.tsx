import { createFileRoute } from '@tanstack/react-router';

const SOYBEAN_DOCS_URL = 'https://docs.soybeanjs.cn/zh/guide/intro.html';

const SoybeanDocs = () => {
  return null;
};

export const Route = createFileRoute('/(admin)/soybean-docs')({
  component: SoybeanDocs,
  staticData: {
    href: SOYBEAN_DOCS_URL,
    menu: {
      icon: 'mdi:book-open-page-variant',
      order: 30
    },
    title: 'Soybean Docs'
  }
});
