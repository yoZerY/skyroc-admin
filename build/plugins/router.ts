import { tanstackRouter } from '@tanstack/router-plugin/vite';

export function setupRouterPlugins() {
  return [
    tanstackRouter({
      autoCodeSplitting: true,
      generatedRouteTree: './src/features/router/routeTree.gen.ts',
      routesDirectory: './src/pages',
      target: 'react'
    })
  ];
}
