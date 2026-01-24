# @skyroc/web-layouts

> 管理后台布局组件 - Web 专用

## 📦 包信息

- **包名**: `@skyroc/web-layouts`
- **版本**: `1.0.0`
- **平台**: Web Only
- **依赖**:
  - `antd` - Ant Design 组件库
  - `@skyroc/web-router` - 路由
  - `@skyroc/adapter-antd` - Ant Design 适配器
  - `@skyroc/core-theme` - 主题

## 🎯 职责定位

**核心职责**:
- 提供管理后台布局框架
- Header、Sider、Footer 组件
- Tab 标签页管理
- 面包屑导航
- 全局搜索

## 📐 目录结构

```
@skyroc/web-layouts/
├── src/
│   ├── admin-layout/
│   │   ├── index.tsx            # 主布局
│   │   ├── modules/
│   │   │   ├── admin-header/    # 头部
│   │   │   ├── admin-sider/     # 侧边栏
│   │   │   ├── admin-tab/       # 标签页
│   │   │   └── admin-footer/    # 底部
│   │   └── state/
│   │       └── use-admin-state.ts
│   └── index.ts
└── package.json
```

## 🔌 API 设计

```ts
export { AdminLayout } from './admin-layout'
export { useAdminState } from './admin-layout/state/use-admin-state'
```

## 🔨 核心实现

### AdminLayout 组件

```tsx
// src/admin-layout/index.tsx
import { Layout } from 'antd'
import { AdminHeader } from './modules/admin-header'
import { AdminSider } from './modules/admin-sider'
import { AdminTab } from './modules/admin-tab'
import { AdminFooter } from './modules/admin-footer'

export function AdminLayout({ children }) {
  const { settings } = useSettingsTheme()

  return (
    <Layout className="h-screen">
      {settings.layout.mode === 'vertical' && <AdminSider />}

      <Layout>
        <AdminHeader />
        {settings.tab.visible && <AdminTab />}

        <Layout.Content className="p-4">
          {children}
        </Layout.Content>

        {settings.footer.visible && <AdminFooter />}
      </Layout>
    </Layout>
  )
}
```

## 💡 使用示例

```tsx
import { AdminLayout } from '@skyroc/web-layouts'
import { RouterProvider } from '@skyroc/web-router'

function App() {
  return (
    <AdminLayout>
      <RouterProvider />
    </AdminLayout>
  )
}
```

## 📝 待补充内容

- [ ] 多种布局模式
- [ ] 响应式布局
- [ ] 主题抽屉
- [ ] 全局搜索
- [ ] 通知中心

---

**最后更新**: 2026-01-25
