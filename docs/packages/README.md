# 包实现文档索引

这个目录包含每个包的详细实现文档。

## 📂 文档结构

```
docs/packages/
├── core/           # 跨平台核心包
├── web/            # Web 专用包
├── adapter/        # 适配器包
├── feature/        # 功能包
└── internal/       # 内部工具包
```

## 📋 核心包 (Core)

| 包名 | 文档 | 状态 | 优先级 |
|-----|------|------|-------|
| `@skyroc/core-auth` | [core/auth.md](./core/auth.md) | ✅ 已完成 | P0 |
| `@skyroc/core-theme` | [core/theme.md](./core/theme.md) | ✅ 已完成 | P0 |
| `@skyroc/core-i18n` | [core/i18n.md](./core/i18n.md) | ✅ 已完成 | P0 |
| `@skyroc/core-storage` | [core/storage.md](./core/storage.md) | ✅ 已完成 | P0 |
| `@skyroc/core-state` | [core/state.md](./core/state.md) | ✅ 已完成 | P1 |
| `@skyroc/core-types` | [core/types.md](./core/types.md) | ✅ 已完成 | P0 |
| `@skyroc/core-constants` | [core/constants.md](./core/constants.md) | ✅ 已完成 | P1 |

## 🌐 Web 包 (Web)

| 包名 | 文档 | 状态 | 优先级 |
|-----|------|------|-------|
| `@skyroc/web-router` | [web/router.md](./web/router.md) | ✅ 已完成 | P0 |
| `@skyroc/web-table` | [web/table.md](./web/table.md) | ✅ 已完成 | P1 |
| `@skyroc/web-form` | [web/form.md](./web/form.md) | ✅ 已完成 | P1 |
| `@skyroc/web-layouts` | [web/layouts.md](./web/layouts.md) | ✅ 已完成 | P0 |
| `@skyroc/web-components` | [web/components.md](./web/components.md) | ✅ 已完成 | P2 |
| `@skyroc/web-animate` | [web/animate.md](./web/animate.md) | ✅ 已完成 | P2 |

## 🔌 适配器包 (Adapter)

| 包名 | 文档 | 状态 | 优先级 |
|-----|------|------|-------|
| `@skyroc/adapter-antd` | [adapter/antd.md](./adapter/antd.md) | ✅ 已完成 | P0 |
| `@skyroc/adapter-react-i18next` | [adapter/react-i18next.md](./adapter/react-i18next.md) | ✅ 已完成 | P1 |

## 🎯 功能包 (Feature)

| 包名 | 文档 | 状态 | 优先级 |
|-----|------|------|-------|
| `@skyroc/feature-notification` | [feature/notification.md](./feature/notification.md) | ✅ 已完成 | P2 |
| `@skyroc/feature-menu` | [feature/menu.md](./feature/menu.md) | ✅ 已完成 | P1 |

## 🛠️ 内部工具包 (Internal)

| 包名 | 文档 | 状态 | 优先级 |
|-----|------|------|-------|
| `@skyroc/tsconfig` | [internal/tsconfig.md](./internal/tsconfig.md) | ✅ 已完成 | P0 |

## 📖 文档模板

每个包的文档应包含以下部分：

1. **包概述** - 职责、定位、适用场景
2. **API 设计** - 导出内容、主要 API
3. **类型定义** - TypeScript 类型
4. **实现要点** - 核心实现逻辑
5. **平台适配** - Web / React Native 差异
6. **使用示例** - 代码示例
7. **迁移指南** - 从现有代码迁移步骤
8. **测试用例** - 测试策略
9. **待补充** - 需要进一步完善的部分

## 📌 开发进度

- [x] 核心包文档 (7个) ✅
- [x] Web 包文档 (6个) ✅
- [x] 适配器包文档 (2个) ✅
- [x] 功能包文档 (2个) ✅
- [x] 内部工具包文档 (1个) ✅
- [x] 迁移指南文档 ✅
- [ ] 迁移脚本实现
- [ ] 最佳实践文档

## 🔗 相关文档

- [包拆分架构方案](../../PACKAGE_SPLIT_ARCHITECTURE.md)
- [迁移指南](../migration/README.md) (待创建)
- [最佳实践](../best-practices/README.md) (待创建)
