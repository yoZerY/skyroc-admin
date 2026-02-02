import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/manage/role/')({
  component: RouteComponent,
  staticData: {
    title: 'role',
    i18nKey: 'route.manage_role',
    menu: {
      icon: 'carbon:user-role',
      order: 2
    },
    permissions: ['R_SUPER']
  }
});

const themeColors = [
  { name: 'Primary', key: 'primary', icon: 'i-carbon:star-filled', gradient: 'from-indigo-400 to-indigo-600' },
  { name: 'Info', key: 'info', icon: 'i-carbon:information-filled', gradient: 'from-sky-400 to-sky-600' },
  { name: 'Success', key: 'success', icon: 'i-carbon:checkmark-filled', gradient: 'from-emerald-400 to-emerald-600' },
  { name: 'Warning', key: 'warning', icon: 'i-carbon:warning-filled', gradient: 'from-amber-400 to-amber-600' },
  { name: 'Error', key: 'error', icon: 'i-carbon:close-filled', gradient: 'from-rose-400 to-rose-600' }
] as const;

const colorPalettes = [
  { gradient: 'from-blue-400 to-blue-600', key: 'blue', name: 'Blue' },
  { gradient: 'from-purple-400 to-purple-600', key: 'purple', name: 'Purple' },
  { gradient: 'from-cyan-400 to-cyan-600', key: 'cyan', name: 'Cyan' },
  { gradient: 'from-green-400 to-green-600', key: 'green', name: 'Green' },
  { gradient: 'from-pink-400 to-pink-600', key: 'pink', name: 'Pink' },
  { gradient: 'from-red-400 to-red-600', key: 'red', name: 'Red' },
  { gradient: 'from-orange-400 to-orange-600', key: 'orange', name: 'Orange' },
  { gradient: 'from-yellow-400 to-yellow-600', key: 'yellow', name: 'Yellow' }
] as const;

const fontSizes = [
  { class: 'text-xs', size: '12px', label: 'Extra Small' },
  { class: 'text-sm', size: '14px', label: 'Small' },
  { class: 'text-base', size: '16px', label: 'Base' },
  { class: 'text-lg', size: '18px', label: 'Large' },
  { class: 'text-xl', size: '20px', label: 'Extra Large' },
  { class: 'text-2xl', size: '24px', label: '2X Large' },
  { class: 'text-3xl', size: '30px', label: '3X Large' },
  { class: 'text-4xl', size: '36px', label: '4X Large' }
] as const;

function RouteComponent() {
  return (
    <div className="min-h-full from-slate-50 via-white to-indigo-50 bg-gradient-to-br p-6 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      <div
        className="mx-auto space-y-10"
        style={{ maxWidth: '1280px' }}
      >
        {/* Hero Section */}
        <section className="py-12 text-center">
          <div className="mb-6 h-20 w-20 inline-flex items-center justify-center rounded-2xl from-indigo-500 to-purple-600 bg-gradient-to-br shadow-indigo-500/25 shadow-xl">
            <span className="i-carbon:color-palette text-4xl text-white" />
          </div>
          <h1 className="mb-4 from-indigo-600 via-purple-600 to-pink-600 bg-gradient-to-r bg-clip-text text-4xl text-transparent font-black tracking-tight md:text-5xl">
            UnoCSS Design System
          </h1>
          <p
            className="mx-auto text-slate-600 text-base md:text-lg dark:text-slate-400"
            style={{ maxWidth: '672px' }}
          >
            专为 Ant Design 打造的 UnoCSS 预设主题系统，提供完整的颜色体系、组件样式和设计规范
          </p>
        </section>

        {/* 主题色系统 */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl text-slate-800 font-bold md:text-3xl dark:text-slate-200">语义化主题色</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 md:text-base">
              Primary · Info · Success · Warning · Error 五种核心主题色
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-5 sm:grid-cols-2">
            {themeColors.map(({ gradient, icon, key, name }) => (
              <div
                className="group relative overflow-hidden border border-slate-200 rounded-xl bg-white p-5 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-800 hover:shadow-lg hover:-translate-y-1"
                key={key}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg text-slate-800 font-bold dark:text-slate-200">{name}</h3>
                  <span
                    className={`${icon} text-xl`}
                    style={{ color: `var(--${key})` }}
                  />
                </div>

                {/* 主色展示 */}
                <div
                  className={`mb-3 h-20 flex items-center justify-center rounded-lg bg-gradient-to-br ${gradient} shadow-lg transition-transform group-hover:scale-105`}
                >
                  <span className="text-2xl text-white font-black drop-shadow">Aa</span>
                </div>

                {/* 色阶预览 */}
                <div className="flex gap-1">
                  {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                    <div
                      className="h-3 flex-1 rounded-sm first:rounded-l last:rounded-r"
                      key={shade}
                      style={{ backgroundColor: `var(--${key}-${shade}, #ccc)` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ant Design 色板 */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl text-slate-800 font-bold md:text-3xl dark:text-slate-200">色板系统</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 md:text-base">
              完整的颜色系统，从 50 到 900 的完整色阶
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2">
            {colorPalettes.map(({ gradient, key, name }) => (
              <div
                className="overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-800 hover:shadow-lg"
                key={key}
              >
                {/* 渐变头部 */}
                <div className={`h-14 flex items-center justify-center bg-gradient-to-r ${gradient}`}>
                  <span className="text-lg text-white font-bold drop-shadow">{name}</span>
                </div>

                {/* 色阶 */}
                <div className="grid grid-cols-10 gap-0.5 p-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                    <div
                      className="h-6 rounded bg-blue-600 transition-transform hover:z-10 hover:scale-125 hover:shadow-md"
                      key={shade}
                      title={`${key}-${shade}`}
                    />
                  ))}
                </div>

                {/* 标签 */}
                <div className="text-2xs flex justify-between border-t border-slate-100 bg-slate-50 px-2 py-1.5 text-slate-400 dark:border-slate-700 dark:bg-slate-900">
                  <span>50</span>
                  <span>500</span>
                  <span>900</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 字体大小 */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl text-slate-800 font-bold md:text-3xl dark:text-slate-200">字体大小体系</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 md:text-base">从 xs 到 9xl 的完整字体大小阶梯</p>
          </div>

          <div className="overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
            {fontSizes.map(({ class: cls, label, size }, index) => (
              <div
                key={cls}
                className={`group flex items-baseline gap-6 border-b border-slate-100 px-6 py-4 transition-colors last:border-b-0 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700 ${
                  index >= 6 ? 'py-6' : ''
                }`}
              >
                <div className="w-24 shrink-0">
                  <code className="block text-sm text-indigo-600 font-semibold font-mono dark:text-indigo-400">
                    {cls}
                  </code>
                  <span className="text-xs text-slate-400">{size}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <span
                    className={`${cls} block truncate text-slate-700 font-medium transition-all dark:text-slate-300 group-hover:text-indigo-600`}
                  >
                    优雅设计系统
                  </span>
                </div>
                <div className="hidden shrink-0 text-xs text-slate-400 md:block">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 实用工具类 */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl text-slate-800 font-bold md:text-3xl dark:text-slate-200">实用工具类</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 md:text-base">预设的快捷样式类，提升开发效率</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Flex 布局 */}
            <div className="border border-slate-200 rounded-xl bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-4 flex items-center gap-2 text-lg text-indigo-600 font-bold dark:text-indigo-400">
                <span className="i-carbon:grid text-xl" />
                Flex 布局
              </h3>
              <div className="space-y-2">
                <div className="h-14 flex items-center justify-center border border-indigo-200 rounded-lg bg-indigo-50 text-sm text-indigo-600 font-medium dark:border-indigo-800 dark:bg-indigo-950">
                  flex-center
                </div>
                <div className="h-14 flex flex-col items-center justify-center border border-emerald-200 rounded-lg bg-emerald-50 text-sm text-emerald-600 font-medium dark:border-emerald-800 dark:bg-emerald-950">
                  flex-col-center
                </div>
              </div>
            </div>

            {/* Position */}
            <div className="border border-slate-200 rounded-xl bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-4 flex items-center gap-2 text-lg text-emerald-600 font-bold dark:text-emerald-400">
                <span className="i-carbon:location text-xl" />
                Position
              </h3>
              <div className="relative h-36 border-2 border-slate-200 rounded-lg border-dashed bg-slate-50 dark:border-slate-600 dark:bg-slate-900">
                <div className="absolute left-2 top-2 rounded bg-indigo-500 px-2 py-1 text-xs text-white">LT</div>
                <div className="absolute right-2 top-2 rounded bg-emerald-500 px-2 py-1 text-xs text-white">RT</div>
                <div className="absolute bottom-2 left-2 rounded bg-amber-500 px-2 py-1 text-xs text-white">LB</div>
                <div className="absolute bottom-2 right-2 rounded bg-rose-500 px-2 py-1 text-xs text-white">RB</div>
                <div className="absolute left-1/2 top-1/2 rounded bg-sky-500 px-2 py-1 text-xs text-white -translate-x-1/2 -translate-y-1/2">
                  CENTER
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="border border-slate-200 rounded-xl bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-4 flex items-center gap-2 text-lg text-amber-600 font-bold dark:text-amber-400">
                <span className="i-carbon:text-font text-xl" />
                Text
              </h3>
              <div className="space-y-3">
                <div className="border border-slate-200 rounded-lg bg-slate-50 p-3 dark:border-slate-600 dark:bg-slate-900">
                  <p className="truncate text-sm text-slate-600 dark:text-slate-400">
                    这是一段超长文本会被截断这是一段超长文本会被截断
                  </p>
                  <code className="mt-1 block text-xs text-slate-400">truncate</code>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="i-carbon:star-filled text-lg text-indigo-500" />
                  <span>text-icon (1.125rem)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 底部装饰 */}
        <div className="pb-8 pt-4 text-center">
          <div className="mb-3 inline-block rounded-full from-indigo-500 via-purple-500 to-pink-500 bg-gradient-to-r p-0.5">
            <div className="rounded-full bg-white px-5 py-2 dark:bg-slate-900">
              <span className="from-indigo-600 via-purple-600 to-pink-600 bg-gradient-to-r bg-clip-text text-transparent font-bold">
                @sa/uno-config
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400">Powered by UnoCSS · Designed for Ant Design</p>
        </div>
      </div>
    </div>
  );
}
