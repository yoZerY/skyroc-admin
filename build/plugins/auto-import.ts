import AutoImport from 'unplugin-auto-import/vite';

/**
 * TanStack Router 的 autoCodeSplitting 会把组件拆成虚拟模块
 * 虚拟模块 ID 格式：原文件路径?tsr-split=component
 *
 * 原本的 /\.[tj]sx?$/ 要求文件 ID 以 .ts/.tsx/.js/.jsx 结尾
 * 但虚拟模块 ID 如 "index.tsx?tsr-split=component" 以 query string 结尾
 *
 * 修改为：/\.[tj]sx?(\?.*)?$/ 可匹配带或不带 query string 的情况
 */
const TSR_SPLIT_RE = /\.[tj]sx?(\?.*)?$/;

export function setupAutoImport() {
  return AutoImport({
    dirs: ['src/hooks/**', 'src/components/**'],
    dts: 'src/types/auto-imports.d.ts',
    dumpUnimportItems: true,
    imports: ['react', { from: 'react', imports: ['FC'], type: true }],
    include: [TSR_SPLIT_RE],
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
