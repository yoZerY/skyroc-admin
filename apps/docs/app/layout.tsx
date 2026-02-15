import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider';
import Script from 'next/script';
import 'fumadocs-ui/style.css';
import './global.css';
import { SnackPlayerInit } from '@/components/mdx';

interface RootLayoutProps {
  /** Page content */
  children: ReactNode;
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <RootProvider>{children}</RootProvider>
        <SnackPlayerInit />
        <Script
          src="https://snack.expo.dev/embed.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
};

export default RootLayout;
