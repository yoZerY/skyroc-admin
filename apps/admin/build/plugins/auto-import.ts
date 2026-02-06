import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
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

export function setupAutoImport(viteEnv: Env.ImportMeta) {
  const { VITE_ICON_LOCAL_PREFIX, VITE_ICON_PREFIX } = viteEnv;
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '');

  return AutoImport({
    dirs: ['src/components/**', 'src/config.ts'],
    dts: 'src/types/auto-imports.d.ts',
    imports: ['react', { from: 'react', imports: ['FC'], type: true }, 'react-i18next', 'ahooks'],
    include: [TSR_SPLIT_RE],
    resolvers: [
      autoImportAntd,
      IconsResolver({
        componentPrefix: VITE_ICON_PREFIX,
        customCollections: [collectionName],
        extension: 'tsx',
        prefix: VITE_ICON_PREFIX
      })
    ]
  });
}

function autoImportAntd(componentName: string) {
  const pattern = /^A[A-Z]/;
  if (pattern.test(componentName)) {
    return { from: 'antd', name: componentName.slice(1) };
  }
  return null;
}
