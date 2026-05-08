import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';
import { baseOptions } from '@/lib/layout.shared';

interface HomeLayoutProps {
  /** 首页路由组中的页面内容 */
  children: ReactNode;
}

const Layout = (props: HomeLayoutProps) => {
  const { children } = props;

  return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
};

export default Layout;
