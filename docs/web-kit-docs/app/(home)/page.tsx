import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HomePageProps extends PageProps<'/'> {}

const packageGroups = [
  {
    description: '后台应用壳、布局骨架、路由页签和常见管理端界面材料。',
    items: [
      { href: '/docs/admin-layouts/overview', name: '@skyroc/web-admin-layouts' },
      { href: '/docs/materials', name: '@skyroc/materials' },
      { href: '/docs/admin-layouts/menus', name: '菜单系统' },
      { href: '/docs/admin-layouts/static-menu-generation', name: '静态菜单生成' },
      { href: '/docs/admin-layouts/dynamic-menu-generation', name: '动态菜单生成' },
      { href: '/docs/materials', name: 'PageTab' },
    ],
    title: '后台材料',
  },
  {
    description: '围绕 Tailwind CSS 的语义颜色、圆角、字号和 utility 注入能力。',
    items: [
      { href: '/docs/tailwind-plugin', name: '@skyroc/tailwind-plugin' },
      { href: '/docs/tailwind-plugin', name: '主题变量' },
      { href: '/docs/tailwind-plugin', name: '预设与样式生成' },
    ],
    title: '主题体系',
  },
  {
    description: '从总览、安装到模块文档，帮助项目按需接入 Web Kit。',
    items: [
      { href: '/docs', name: '文档总览' },
      { href: '/docs/admin-layouts/quick-start', name: 'Admin Layouts 接入' },
      { href: '/docs/materials', name: 'Materials 文档' },
      { href: '/docs/tailwind-plugin', name: 'Tailwind 插件文档' },
    ],
    title: '使用入口',
  },
] as const;

const HomePage = (props: HomePageProps) => {
  const { params: _params, searchParams: _searchParams } = props;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-14 md:py-20">
      <section className="max-w-3xl">
        <p className="text-sm font-medium text-fd-muted-foreground">Skyroc Web Kit</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fd-foreground md:text-5xl">
          Web Kit 前端材料文档
        </h1>
        <p className="mt-5 text-lg leading-8 text-fd-muted-foreground">
          汇总后台产品的应用壳、布局材料、路由页签与 Tailwind 主题插件，作为 Skyroc 前端工程体系里面向 Web 界面的文档入口。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-md bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
          >
            查看总览
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/docs/admin-layouts/overview"
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            浏览后台壳
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {packageGroups.map(group => (
          <div key={group.title} className="rounded-lg border bg-fd-card p-5 text-fd-card-foreground">
            <h2 className="text-lg font-semibold">{group.title}</h2>
            <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{group.description}</p>
            <div className="mt-5 flex flex-col gap-2">
              {group.items.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors hover:bg-fd-accent"
                >
                  {item.name}
                  <ArrowRight className="size-4 text-fd-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

    </main>
  );
};

export default HomePage;
