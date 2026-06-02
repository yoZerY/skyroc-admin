# Skyroc Admin

一个基于 **React 19 + TypeScript + Vite** 的跨端中后台管理系统工程。使用 **pnpm + Turborepo** 组织 monorepo，UI 采用 **Ant Design + UnoCSS / Tailwind CSS**，路由与数据层基于 **TanStack Router / TanStack Query**，状态管理使用 **Jotai**。

> 它不是单一应用，而是一整套「**分层、跨端、可复用**」的前端基础设施。应用（`apps/*`）只是一层薄壳，负责装配与业务页面；真正的能力沉淀在数十个 `@skyroc/*` workspace 包中。

## ✨ 特性

- **现代技术栈**：React 19、Vite 8、TypeScript 6、React Compiler、TanStack Router/Query、Jotai。
- **分层架构**：基础设施层（`@core`）→ Web Kit 层（`web/*`）→ 业务应用层（`apps/*`），边界清晰、可独立演进。
- **跨平台导向**：核心包平台无关，预留 React Native 与小程序端能力（`packages/native/*`、`packages/miniapp/*`）。
- **完整后台能力**：动态路由、菜单/页签、权限控制、登录态与 Token 刷新、主题系统（OKLCH 色彩、暗黑模式）、国际化。
- **自带 UI 组件库**：基于 Radix UI + Tailwind 的 `@skyroc/web-ui`（类 shadcn），以及 Ant Design 复合组件。
- **工程化完善**：Turborepo 任务编排、oxlint + oxfmt、Vitest + Playwright 测试、catalog 统一依赖版本、CLI 自动化脚本。
- **丰富文档**：5 个独立文档站点，覆盖应用、核心包、Web Kit、UI 组件与项目总览。

## 🛠️ 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | React 19、TypeScript |
| 构建 | Vite 8、Turborepo、tsdown |
| 路由 | TanStack Router（文件式路由 + 动态路由） |
| 数据 | TanStack Query、Axios（`@skyroc/axios`） |
| 状态 | Jotai（`@skyroc/core-state`） |
| UI | Ant Design 6、`@skyroc/web-ui`（Radix UI + Tailwind） |
| 样式 | UnoCSS、Tailwind CSS 4、Sass、OKLCH 主题 |
| 国际化 | i18next、react-i18next |
| 图表 | ECharts |
| 测试 | Vitest、Testing Library、Playwright、MSW |
| 代码质量 | oxlint、oxfmt |

## 📦 目录结构

```text
soybean-admin-react/
├── apps/                       # 业务应用（薄壳，负责装配与页面）
│   ├── admin/                  # 主后台应用 skyroc-admin
│   ├── admin-example/          # 含完整 demo 页面的示例应用
│   └── web-ui-playground/      # @skyroc/web-ui 组件库 playground
│
├── packages/
│   ├── @core/                  # 基础设施层（平台无关、可独立发布）
│   │   ├── utils/              # 平台无关工具函数（含 ./web 子路径）
│   │   ├── axios/              # 类型安全 Axios 客户端（重试/转换/取消/Token 刷新）
│   │   ├── service/            # 请求与查询基础设施（适配器模式）
│   │   ├── state/              # Jotai 状态管理封装
│   │   ├── logger/             # 跨平台日志系统（基于 LogLayer）
│   │   ├── scheduler/          # 协作式任务调度器
│   │   ├── color/              # 色彩工具与调色板生成（OKLCH）
│   │   ├── types/              # 全局类型定义
│   │   ├── type-utils/         # 高级 TypeScript 工具类型
│   │   └── scripts/            # 项目 CLI（changelog、release、git-commit 等）
│   │
│   ├── web/                    # Web Kit 层（后台界面工程能力）
│   │   ├── admin-layouts/      # 后台应用壳（菜单/权限/页签/布局）
│   │   ├── materials/          # 插槽式 AdminLayout 与多风格 PageTab
│   │   ├── admin-theme/        # Ant Design 主题工具（暗黑/系统主题）
│   │   ├── antd-theme/         # Ant Design 主题适配（OKLCH 算法）
│   │   ├── admin-i18n/         # 后台国际化运行时与语言 UI
│   │   ├── admin-vite/         # Vite 构建辅助与插件预设
│   │   ├── admin-runtime/      # 启动插件运行时辅助
│   │   ├── admin-notification/ # 通知 Provider / hooks / Header 动作
│   │   ├── admin-devtools/     # 仅开发态的 devtools 面板
│   │   ├── admin-styles/       # 全局 CSS 资源
│   │   ├── tailwind-plugin/    # Tailwind 主题插件（OKLCH 设计令牌）
│   │   └── ui/
│   │       ├── shadcn/         # @skyroc/web-ui（Radix UI + Tailwind 组件库）
│   │       ├── antd/           # Ant Design 复合组件
│   │       └── compose/        # 基于 UI primitives 的无状态复合组件
│   │
│   ├── shared/                 # 跨端共享
│   │   ├── ui-tokens/          # 设计令牌（颜色/间距/圆角/字体，零运行时依赖）
│   │   └── ui-types/           # 共享 UI 类型定义
│   │
│   ├── primitives/
│   │   └── filed-form/         # @skyroc/form 类型安全表单库
│   │
│   └── hooks/                  # 跨平台 React hooks（含 ./web 子路径）
│
├── docs/                       # 文档站点
│   ├── project-docs/           # 项目总览
│   ├── admin-docs/             # apps/admin 应用文档
│   ├── core-docs/              # @core 基础设施文档
│   ├── web-kit-docs/           # Web Kit 文档
│   └── web-ui-docs/            # UI 组件库文档
│
└── internal/                   # 内部共享配置
    ├── tsconfig/               # 共享 TypeScript 配置
    ├── uno-config/             # UnoCSS 预设配置
    └── config/                 # 共享开发配置（Vitest、Oxlint 等）
```

### 架构分层

```text
┌───────────────────────────────────────────────────────┐
│  Applications     apps/admin · apps/admin-example       │  业务应用（薄壳）
└───────────────────────────────────────────────────────┘
                          ▲ 依赖
┌───────────────────────────────────────────────────────┐
│  Web Kit          packages/web/*（布局 / 主题 / UI）    │  界面工程层
└───────────────────────────────────────────────────────┘
                          ▲ 依赖
┌───────────────────────────────────────────────────────┐
│  Core             packages/@core/*（utils/axios/...）   │  基础设施层（平台无关）
└───────────────────────────────────────────────────────┘
```

## 🚀 快速开始

### 环境要求

- **Node.js** >= 20
- **pnpm** >= 8.7（推荐使用仓库锁定的 `pnpm@10.4.1`）

### 安装依赖

```bash
pnpm install
```

### 启动主应用

```bash
# 在仓库根目录启动所有 dev 任务
pnpm dev

# 或仅启动主后台应用
pnpm --filter skyroc-admin dev
```

### 构建

```bash
# 构建全部包与应用
pnpm build

# 仅构建主应用
pnpm --filter skyroc-admin build
```

## 📜 常用脚本

仓库根目录通过 Turborepo 统一编排任务：

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动所有应用/包的开发模式 |
| `pnpm build` | 构建全部包与应用 |
| `pnpm lint` | 运行 oxlint 代码检查 |
| `pnpm format` | 使用 oxfmt 格式化代码 |
| `pnpm format:check` | 校验代码格式 |
| `pnpm typecheck` | 全量 TypeScript 类型检查 |
| `pnpm test` | 运行单元测试（Vitest） |
| `pnpm test:e2e` | 运行端到端测试（Playwright） |
| `pnpm test:ui` | 启动 Vitest UI |
| `pnpm clean` | 清理构建产物 |
| `pnpm create:admin` | 通过 CLI 创建新的 admin 项目 |

## 🧱 核心包速查

| 包名 | 职责 |
| --- | --- |
| `@skyroc/utils` | 平台无关工具函数（日期/存储/加密/事件/并发去重等） |
| `@skyroc/axios` | 类型安全的 Axios 客户端工厂（业务响应适配、Token 刷新、请求取消） |
| `@skyroc/service` | 请求与查询基础设施，通过适配器接入 UI、鉴权、导航与 React Query |
| `@skyroc/core-state` | Jotai 状态管理封装，跨平台支持 |
| `@skyroc/color` | 色彩工具与调色板生成（基于 colord/culori 与 OKLCH） |
| `@skyroc/web-admin-layouts` | 后台应用壳，组合菜单、权限、路由页签与布局状态 |
| `@skyroc/materials` | 插槽式 AdminLayout 与多风格 PageTab |
| `@skyroc/web-ui` | 基于 Radix UI + Tailwind 的现代 React 组件库 |
| `@skyroc/form` | 类型安全的高级表单处理库 |

## 📚 文档

项目提供多个独立文档站点（均位于 `docs/`，基于 Fumadocs 构建）：

- **project-docs** —— 项目总览与整体架构
- **admin-docs** —— `apps/admin` 的启动、路由、菜单、权限与请求服务
- **core-docs** —— `@core` 基础设施层各包的用途与边界
- **web-kit-docs** —— 应用壳、主题、布局材料与 Ant Design 适配
- **web-ui-docs** —— `@skyroc/web-ui` 组件库使用与设计系统

启动任一文档站点：

```bash
pnpm --filter <docs-package-name> dev
```

## 📄 许可证

本项目基于 [MIT](./LICENSE) 许可证开源。
