import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
// oxlint-disable-next-line import/no-unassigned-import
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

interface RootLayoutProps {
  /** Next.js 注入的页面与文档内容 */
  children: ReactNode;
}

const Layout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
};

export default Layout;
