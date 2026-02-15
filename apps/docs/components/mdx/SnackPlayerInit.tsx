'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    ExpoSnack?: {
      initialize(): void;
      remove(container: Element): void;
      append(container: Element): void;
    };
  }
}

function getResolvedTheme(): string {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function updateSnacksTheme() {
  const theme = getResolvedTheme();
  document.querySelectorAll('.snack-player').forEach(snack => {
    (snack as HTMLElement).dataset.snackTheme = theme;
  });
}

function initSnackPlayers() {
  updateSnacksTheme();
  window.ExpoSnack?.initialize();
}

const SnackPlayerInit = () => {
  const pathname = usePathname();

  // Initialize on mount and route changes
  useEffect(() => {
    // embed.js may not be loaded yet (strategy="lazyOnload"), poll for it
    const timer = setInterval(() => {
      if (window.ExpoSnack) {
        clearInterval(timer);
        initSnackPlayers();
      }
    }, 200);

    return () => clearInterval(timer);
  }, [pathname]);

  // Watch for theme changes (fumadocs uses next-themes → class on <html>)
  useEffect(() => {
    const html = document.documentElement;

    const observer = new MutationObserver(() => {
      if (!window.ExpoSnack) return;

      document.querySelectorAll('.snack-player').forEach(container => {
        updateSnacksTheme();
        window.ExpoSnack?.remove(container);
        window.ExpoSnack?.append(container);
      });
    });

    observer.observe(html, {
      attributeFilter: ['class'],
      attributes: true,
      childList: false,
      subtree: false
    });

    return () => observer.disconnect();
  }, []);

  return null;
};

export { SnackPlayerInit };
