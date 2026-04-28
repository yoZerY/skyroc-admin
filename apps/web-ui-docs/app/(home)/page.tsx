'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Component,
  Copy,
  Palette,
  Puzzle,
  Sparkles,
  Zap
} from 'lucide-react';
import { Button, Card, Icon, Progress, Slider, Switch, Tag } from '@skyroc/web-ui';

import { BentoShowcase } from './components/BentoShowcase';

const COLOR_STYLE_MAP: Record<string, { bg: string; text: string; iconBg: string }> = {
  primary: { bg: 'bg-primary/10', text: 'text-primary', iconBg: 'bg-primary/10' },
  success: { bg: 'bg-success/10', text: 'text-success', iconBg: 'bg-success/10' },
  warning: { bg: 'bg-warning/10', text: 'text-warning', iconBg: 'bg-warning/10' },
  info: { bg: 'bg-info/10', text: 'text-info', iconBg: 'bg-info/10' }
};

const COMPONENT_CATEGORIES = [
  {
    title: '输入控件',
    description: '表单元素与用户输入',
    components: ['Button', 'Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Slider', 'Switch'],
    href: '/docs/components/button',
    icon: 'lucide:text-cursor-input',
    color: 'primary'
  },
  {
    title: '数据展示',
    description: '内容呈现与数据可视化',
    components: ['Card', 'Badge', 'Tag', 'Avatar', 'List', 'Tree', 'Carousel', 'Progress'],
    href: '/docs/components/card',
    icon: 'lucide:layers',
    color: 'success'
  },
  {
    title: '弹层覆盖',
    description: '模态框、弹出层与提示',
    components: ['Dialog', 'Drawer', 'Popover', 'Tooltip', 'Hover Card', 'Alert Dialog'],
    href: '/docs/components/dialog',
    icon: 'lucide:panel-top',
    color: 'warning'
  },
  {
    title: '导航组件',
    description: '菜单、选项卡与路由导航',
    components: ['Tabs', 'Breadcrumb', 'Pagination', 'Navigation Menu', 'Menubar', 'Segment'],
    href: '/docs/components/tabs',
    icon: 'lucide:compass',
    color: 'info'
  }
];

const FEATURES = [
  {
    title: '可组合',
    description: '从简单原语构建复杂 UI，每个组件都经过精心设计，可以无缝协作。支持 Slot 模式和 asChild 渲染委托。',
    icon: Puzzle
  },
  {
    title: '主题系统',
    description: 'ConfigProvider 全局主题，支持尺寸、颜色、变体预设，一行代码切换风格。',
    icon: Palette
  },
  {
    title: '无障碍',
    description: '基于 Radix UI 原语，完整 WAI-ARIA 支持，开箱即用的键盘导航。',
    icon: Sparkles
  },
  {
    title: '高性能',
    description: 'Tree-shaking 友好，零运行时开销。只打包你使用的组件，极致的包体积优化。',
    icon: Zap
  }
];

const InstallCommand = () => {
  const [copied, setCopied] = useState(false);
  const command = 'pnpm add @skyroc/web-ui';

  function handleCopy() {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-3 rounded-full border border-border bg-card/80 backdrop-blur-sm px-5 py-2.5 font-mono text-sm transition-all hover:border-primary/30 hover:shadow-md cursor-pointer"
    >
      <span className="text-muted-foreground">$</span>
      <span className="text-foreground">{command}</span>
      {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5 text-muted-foreground" />}
    </button>
  );
};

const HeroComponentCluster = () => {
  const [switchOn, setSwitchOn] = useState(true);

  return (
    <div className="relative hidden lg:flex items-center justify-center">
      <div className="relative grid grid-cols-2 gap-3 w-full max-w-md">
        <div className="rounded-2xl border border-white/20 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-4 space-y-2.5 shadow-lg shadow-primary/5">
          <span className="text-xs font-medium text-muted-foreground">Buttons</span>
          <div className="flex flex-wrap gap-1.5">
            <Button size="sm" color="primary" shape="rounded">主要</Button>
            <Button size="sm" color="secondary" variant="outline" shape="rounded">次要</Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Button size="sm" color="success" variant="soft" shape="rounded">成功</Button>
            <Button size="sm" color="destructive" variant="ghost" shape="rounded">删除</Button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-4 space-y-2.5 shadow-lg shadow-success/5">
          <span className="text-xs font-medium text-muted-foreground">Tags</span>
          <div className="flex flex-wrap gap-1.5">
            <Tag color="primary">React</Tag>
            <Tag color="success">稳定</Tag>
            <Tag color="warning">Beta</Tag>
            <Tag color="info">新</Tag>
          </div>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-4 space-y-2.5 shadow-lg shadow-info/5">
          <span className="text-xs font-medium text-muted-foreground">Progress</span>
          <Progress value={78} color="primary" />
          <Progress value={45} color="success" />
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-4 space-y-3 shadow-lg shadow-warning/5">
          <span className="text-xs font-medium text-muted-foreground">Controls</span>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">深色模式</span>
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
          </div>
          <Slider defaultValue={[60]} max={100} step={1} aria-label="音量" />
        </div>
      </div>
    </div>
  );
};

const ComposablePreview = () => (
  <div className="mt-auto pt-6">
    <div className="rounded-xl border border-white/20 bg-white/60 dark:bg-white/5 backdrop-blur-sm p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon icon="lucide:layout-dashboard" className="size-4 text-primary" />
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">设置面板</div>
          <div className="text-xs text-muted-foreground">Card + Tabs + Button</div>
        </div>
      </div>
      <div className="flex gap-1.5">
        <Tag color="primary" variant="pure" className="text-xs">Card</Tag>
        <Tag color="info" variant="pure" className="text-xs">Tabs</Tag>
        <Tag color="success" variant="pure" className="text-xs">Button</Tag>
      </div>
      <Button size="sm" color="primary" className="w-full" shape="rounded">
        <Check className="mr-1.5 size-3.5" />
        保存设置
      </Button>
    </div>
  </div>
);

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* 沉浸式渐变背景 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.08] via-primary/[0.03] to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-primary/[0.12] blur-[120px]" />
          <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-info/[0.08] blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full bg-success/[0.06] blur-[100px]" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* 左侧：文案 */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Tag color="primary" className="mb-6" variant="pure">
                <Icon icon="lucide:paintbrush" className="mr-1.5 size-3.5" />
                基于 Radix UI + Tailwind CSS
              </Tag>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-foreground">为现代 React 应用</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-info bg-clip-text text-transparent">
                  打造的精美组件库
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                全面、无障碍、高度可定制。可组合的原语设计搭配强大的主题系统，让你专注于业务逻辑。
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Button asChild color="primary" size="lg" shape="rounded">
                  <Link href="/docs">
                    快速开始
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <InstallCommand />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <Component className="size-4 text-primary" />
                  50+ 组件
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Code2 className="size-4 text-info" />
                  TypeScript
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Palette className="size-4 text-warning" />
                  深色模式
                </span>
              </div>
            </div>

            {/* 右侧：组件交互集群 */}
            <HeroComponentCluster />
          </div>
        </div>
      </section>

      {/* Bento Grid 组件展示 */}
      <section className="relative border-t border-border/50">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="mb-14 flex flex-col items-center text-center">
            <Tag color="primary" variant="pure" className="mb-4">组件展示</Tag>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              真实场景，交互体验
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              不是孤立的 Demo，而是真实业务场景中的组件组合。
            </p>
          </div>
          <BentoShowcase />
        </div>
      </section>

      {/* 特性区 */}
      <section className="relative border-t border-border/50">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/[0.04] blur-[100px]" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="mb-14 flex flex-col items-center text-center">
            <Tag color="info" variant="pure" className="mb-4">核心优势</Tag>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              为什么选择 Skyroc UI？
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              为追求品质和开发体验的团队而生。
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* 大卡片 */}
            <div className="relative overflow-hidden md:row-span-2 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] via-primary/[0.03] to-transparent p-1">
              <div className="flex h-full flex-col rounded-xl bg-card/80 backdrop-blur-sm p-6">
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <Puzzle className="size-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {FEATURES[0]!.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {FEATURES[0]!.description}
                </p>
                <ComposablePreview />
              </div>
            </div>

            {/* 小卡片 */}
            {FEATURES.slice(1).map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-1 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex flex-col rounded-xl p-6">
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-muted">
                    <feature.icon className="size-5 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 组件分类 */}
      <section className="relative border-t border-border/50">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="mb-14 flex flex-col items-center text-center">
            <Tag color="success" variant="pure" className="mb-4">组件总览</Tag>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              探索全部组件
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              从基础输入到复杂数据展示，构建生产级 UI 所需的一切。
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {COMPONENT_CATEGORIES.map((category, idx) => {
              const styles = COLOR_STYLE_MAP[category.color]!;
              return (
                <Link
                  key={category.title}
                  href={category.href}
                  className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 cursor-pointer ${idx === 0 ? 'sm:col-span-2' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 inline-flex size-12 items-center justify-center rounded-xl ${styles.iconBg}`}>
                      <Icon icon={category.icon} className={`size-6 ${styles.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">
                          {category.title}
                        </h3>
                        <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {category.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {category.components.map((comp) => (
                          <Tag key={comp} variant="pure" className="text-xs">
                            {comp}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </div>

                  {idx === 0 && (
                    <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/50 pt-5">
                      <Button size="sm" color="primary" shape="rounded">Primary</Button>
                      <Button size="sm" color="secondary" variant="outline" shape="rounded">Outline</Button>
                      <Button size="sm" color="success" variant="soft" shape="rounded">Success</Button>
                      <Button size="sm" color="destructive" variant="ghost" shape="rounded">Ghost</Button>
                      <Button size="sm" color="carbon" variant="dashed" shape="rounded">Dashed</Button>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border/50 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.06] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/[0.1] blur-[120px]" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                开始构建
              </span>
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              完善的文档、TypeScript 类型支持、完整的无障碍方案。立即在你的项目中使用 Skyroc UI。
            </p>

            <div className="mt-10 flex items-center gap-10 text-center">
              <div>
                <div className="text-4xl font-extrabold text-primary">50+</div>
                <div className="mt-1 text-sm text-muted-foreground">组件</div>
              </div>
              <div className="h-10 w-px bg-border/50" />
              <div>
                <div className="text-4xl font-extrabold text-success">100%</div>
                <div className="mt-1 text-sm text-muted-foreground">TypeScript</div>
              </div>
              <div className="h-10 w-px bg-border/50" />
              <div>
                <div className="text-4xl font-extrabold text-info">A11y</div>
                <div className="mt-1 text-sm text-muted-foreground">无障碍</div>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
              <Button asChild color="primary" size="lg" shape="rounded">
                <Link href="/docs">
                  <BookOpen className="mr-2 size-4" />
                  阅读文档
                </Link>
              </Button>
              <Button asChild color="carbon" variant="outline" size="lg" shape="rounded">
                <a
                  href="https://github.com/soybeanjs/soybean-admin-react"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon icon="lucide:github" className="mr-2 size-4" />
                  GitHub 仓库
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
