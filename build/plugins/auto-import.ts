import AutoImport from 'unplugin-auto-import/vite';

export function setupAutoImport() {
  return AutoImport({
    dirs: ['src/hooks/**', 'src/components/**'],
    dts: 'src/types/auto-imports.d.ts',
    imports: ['react', { from: 'react', imports: ['FC'], type: true }],
    include: [/\.[tj]sx?$/],
    resolvers: [autoImportAntd]
  });
}

function autoImportAntd(componentName: string) {
  const pattern = /^A[A-Z]/;
  if (pattern.test(componentName)) {
    return { from: 'antd', name: componentName.slice(1) };
  }
  return null;
}
