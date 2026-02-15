# Expo Snack 集成原理

## 一句话总结

你在 MDX 里写的代码，**从未上传到 Expo 服务器**。代码被编码成字符串塞在 HTML 属性里，由 Expo 官方的 `embed.js` 在浏览器端读取后，创建一个 iframe 指向 `snack.expo.dev`，iframe 里才是真正运行代码的沙箱。

---

## 完整数据流

```
你写的 MDX                构建时 (Next.js build)              浏览器端
─────────────────    ─────────────────────────    ─────────────────────────

```SnackPlayer          remark-snackplayer 插件        embed.js (Expo CDN)
name=Demo             解析代码块 → 生成 div          扫描 .snack-player div
import React...       <div                           读取 data-snack-* 属性
...                     class="snack-player"          创建 <iframe> 嵌入页面
export default App;     data-snack-files="编码后代码"   ↓
```                     data-snack-name="Demo"        iframe 内: snack.expo.dev
                        ...                           ├─ 左侧：代码编辑器
                      />                              └─ 右侧：手机模拟器
```

---

## 涉及的 4 个文件及各自职责

### 1. `lib/remark-snackplayer.ts` — 构建时转换

**何时运行**：Next.js 编译 MDX 文件时（`pnpm build` 或 `pnpm dev` 热更新时）

**做了什么**：

```
输入：Markdown AST 中 lang="SnackPlayer" 的代码块节点

{
  type: 'code',
  lang: 'SnackPlayer',
  meta: 'name=Button%20Demo&platform=web',   ← 参数
  value: 'import React from "react";\n...'    ← 你写的代码
}

       ↓ 转换

输出：MDX JSX 节点（一个 div）

{
  type: 'mdxJsxFlowElement',
  name: 'div',
  attributes: [
    { name: 'className',                  value: 'snack-player' },
    { name: 'data-snack-name',            value: 'Button Demo' },
    { name: 'data-snack-files',           value: '%7B%22App.tsx%22...' },  ← URL编码的JSON
    { name: 'data-snack-dependencies',    value: 'react-native-safe-area-context' },
    { name: 'data-snack-platform',        value: 'web' },
    { name: 'data-snack-theme',           value: 'light' },
    ...
  ]
}
```

**关键细节**：

- `data-snack-files` 的值是 `encodeURIComponent(JSON.stringify({ "App.tsx": { type: "CODE", contents: "你的代码" } }))`
- 代码就是一个被 URL 编码的 JSON 字符串，**藏在 HTML 属性里**，不需要网络请求
- 参数通过 `URLSearchParams` 解析，所以 meta 格式是 `key=value&key2=value2`

### 2. `source.config.ts` — 注册插件

```ts
export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkSnackPlayer]   // ← 挂载到 fumadocs 的 MDX 编译管道
  }
});
```

fumadocs-mdx 在编译每个 `.mdx` 文件时，会依次执行所有 remark 插件。
我们的插件排在内置插件之后，在 Markdown AST → HTML 之间介入。

### 3. `app/layout.tsx` — 加载 Expo 脚本

```tsx
<Script src="https://snack.expo.dev/embed.js" strategy="lazyOnload" />
<SnackPlayerInit />
```

- `embed.js` 是 Expo 官方提供的嵌入脚本（~50KB），从 CDN 加载
- `strategy="lazyOnload"` 表示页面空闲时才加载，不阻塞首屏
- 加载完成后，`embed.js` 会在 `window` 上挂载 `ExpoSnack` 对象：

```ts
window.ExpoSnack = {
  initialize(): void;              // 扫描页面上所有 .snack-player div，创建 iframe
  remove(container: Element): void; // 移除某个 player 的 iframe
  append(container: Element): void; // 重新为某个 div 创建 iframe
};
```

### 4. `components/mdx/SnackPlayerInit.tsx` — 客户端初始化

这是一个 React Client Component（`'use client'`），渲染结果为 `null`（不产生任何 DOM），只负责副作用：

**职责 1：初始化 Snack Player**

```
页面加载 / 路由切换
  → useEffect 触发（依赖 pathname）
  → 轮询等待 window.ExpoSnack 存在（embed.js 可能还没加载完）
  → 同步当前主题到所有 .snack-player 元素
  → 调用 window.ExpoSnack.initialize()
  → embed.js 扫描所有 .snack-player div
  → 为每个 div 创建 iframe → snack.expo.dev
```

**职责 2：主题同步**

```
用户切换 dark/light 主题
  → fumadocs (next-themes) 在 <html> 上 添加/移除 "dark" class
  → MutationObserver 检测到 class 变化
  → 更新所有 .snack-player 的 data-snack-theme 属性
  → 对每个 player: remove() 销毁旧 iframe → append() 创建新 iframe
  → 新 iframe 以正确的主题渲染
```

为什么要 remove + append？因为 Snack 的 iframe 内部不监听外部主题变化，
只在创建时读取一次 `data-snack-theme`，所以必须重建。

---

## MDX 语法

````mdx
```SnackPlayer name=显示名称&platform=web&dependencies=expo-constants
import React from 'react';
import { View, Text } from 'react-native';

export default () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Hello Snack!</Text>
  </View>
);
```
````

**语言标识必须是 `SnackPlayer`**（大小写敏感），否则会被当作普通代码块高亮。

---

## 参数参考

所有参数写在代码块的 meta 位置（` ```SnackPlayer ` 后面），格式为 URL query string：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `name` | 播放器标题（需 URL 编码，空格用 `%20`） | `"Example"` |
| `description` | 描述文字 | `"Example usage"` |
| `dependencies` | 额外 npm 依赖，逗号分隔 | `""` |
| `ext` | 文件扩展名 | `"tsx"` |
| `platform` | 默认预览平台 | `"web"` |
| `supportedPlatforms` | 可切换的平台 | `"ios,android,web"` |
| `theme` | 初始主题（会被自动同步覆盖） | `"light"` |
| `preview` | 是否显示预览面板 | `"true"` |
| `loading` | iframe 加载策略 | `"lazy"` |
| `deviceAppearance` | 模拟器外观 | `"light"` |

### 示例

只显示 iOS 和 Web：
````
```SnackPlayer name=iOS%20Only&supportedPlatforms=ios,web
````

添加额外依赖：
````
```SnackPlayer dependencies=expo-linear-gradient,expo-blur
````

使用 JavaScript（非 TypeScript）：
````
```SnackPlayer ext=js
````

---

## 限制

| 限制 | 原因 | 解决方案 |
|------|------|----------|
| 不能 import 私有包 | Snack 是云端沙箱，只有 npm 公开包 | 发布到 npm，或在代码中内联实现 |
| 首次加载稍慢 | embed.js + iframe + Snack 编译 | `loading=lazy` 延迟加载 |
| 需要联网 | iframe 指向 snack.expo.dev | 离线环境用 `<ComponentPreview />` |
| 主题切换闪烁 | iframe 需要销毁重建 | Expo Snack 的已知限制，无法规避 |

---

## 架构图

```
apps/docs/
├── lib/
│   └── remark-snackplayer.ts        ← [构建时] 转换 MDX 代码块
├── components/mdx/
│   └── SnackPlayerInit.tsx          ← [运行时] 初始化 + 主题同步
├── source.config.ts                 ← 注册 remark 插件
├── app/
│   └── layout.tsx                   ← 加载 embed.js CDN 脚本
└── content/docs/
    └── *.mdx                        ← 写 SnackPlayer 代码块的地方


构建时管道：
  MDX 文件 → remark-snackplayer → <div data-snack-*> → HTML

运行时管道：
  浏览器加载页面
    → embed.js 从 CDN 加载
    → SnackPlayerInit 检测到 ExpoSnack 就绪
    → 调用 ExpoSnack.initialize()
    → embed.js 把每个 .snack-player div 变成 iframe
    → iframe 内: Expo Snack 在线编辑器 + 模拟器
```
