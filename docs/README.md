# 文档中心

欢迎查阅 Skyroc Admin 包拆分项目文档。

## 📚 文档结构

```
docs/
├── README.md                           # 本文档
├── migration-guide.md                  # 迁移指南
└── packages/                           # 包实现文档
    ├── README.md                       # 包索引
    ├── core/                           # 核心包文档
    │   ├── auth.md                    ✅ 已创建
    │   ├── storage.md                 ✅ 已创建
    │   ├── theme.md                   ✅ 已创建
    │   ├── i18n.md                    📝 待创建
    │   ├── state.md                   📝 待创建
    │   ├── types.md                   📝 待创建
    │   └── constants.md               📝 待创建
    ├── web/                            # Web 包文档
    │   ├── router.md                  ✅ 已创建
    │   ├── table.md                   📝 待创建
    │   ├── form.md                    📝 待创建
    │   ├── layouts.md                 📝 待创建
    │   ├── components.md              📝 待创建
    │   └── animate.md                 📝 待创建
    ├── adapter/                        # 适配器包文档
    │   ├── antd.md                    ✅ 已创建
    │   └── react-i18next.md           📝 待创建
    └── feature/                        # 功能包文档
        ├── notification.md            📝 待创建
        └── menu.md                    📝 待创建
```

## 🎯 快速导航

### 核心文档

- [包拆分架构方案](../PACKAGE_SPLIT_ARCHITECTURE.md) - 整体架构设计
- [迁移指南](./migration-guide.md) - 分阶段迁移步骤
- [包文档索引](./packages/README.md) - 所有包的实现文档

### 已完成的包文档

#### 核心包 (Core) - 7/7 ✅
- [✅ core-auth](./packages/core/auth.md) - 认证核心逻辑
- [✅ core-storage](./packages/core/storage.md) - 存储抽象层
- [✅ core-theme](./packages/core/theme.md) - 主题核心逻辑
- [✅ core-i18n](./packages/core/i18n.md) - 国际化核心
- [✅ core-state](./packages/core/state.md) - Jotai 状态管理
- [✅ core-types](./packages/core/types.md) - 全局类型定义
- [✅ core-constants](./packages/core/constants.md) - 常量和枚举

#### Web 包 - 6/6 ✅
- [✅ web-router](./packages/web/router.md) - TanStack Router 封装
- [✅ web-table](./packages/web/table.md) - Ant Design 表格功能
- [✅ web-form](./packages/web/form.md) - Ant Design 表单增强
- [✅ web-layouts](./packages/web/layouts.md) - 管理后台布局
- [✅ web-components](./packages/web/components.md) - Web 通用组件
- [✅ web-animate](./packages/web/animate.md) - 动画功能

#### 适配器包 - 2/2 ✅
- [✅ adapter-antd](./packages/adapter/antd.md) - Ant Design 主题适配
- [✅ adapter-react-i18next](./packages/adapter/react-i18next.md) - react-i18next 适配

#### 功能包 - 2/2 ✅
- [✅ feature-notification](./packages/feature/notification.md) - 通知系统
- [✅ feature-menu](./packages/feature/menu.md) - 菜单系统

#### 内部工具包 - 1/1 ✅
- [✅ tsconfig](./packages/internal/tsconfig.md) - TypeScript 配置

## 📝 文档完成情况

### 已完成文档 ✅

**核心架构文档**:
- ✅ [PACKAGE_SPLIT_ARCHITECTURE.md](../PACKAGE_SPLIT_ARCHITECTURE.md) - 完整的架构方案
- ✅ [migration-guide.md](./migration-guide.md) - 5阶段迁移指南

**包实现文档** (18/18):
- ✅ 核心包 7个
- ✅ Web 包 6个
- ✅ 适配器包 2个
- ✅ 功能包 2个
- ✅ 内部工具包 1个

### 待补充内容

- [ ] 迁移工具脚本实现
- [ ] 最佳实践文档
- [ ] 性能优化指南
- [ ] 测试覆盖率报告

## 🛠️ 补充文档的模板

每个包的文档应包含以下章节：

```markdown
# @skyroc/[package-name]

## 📦 包信息
- 包名、版本、平台、依赖

## 🎯 职责定位
- 核心职责
- 不负责的内容

## 📐 目录结构
- 文件组织

## 🔌 API 设计
- 主要导出
- 类型定义

## 🔨 核心实现
- 关键代码示例

## 🌐 平台适配
- Web / React Native 差异

## 💡 使用示例
- 实际使用场景

## 🔄 从现有代码迁移
- 迁移步骤

## 📝 待补充内容
- 待完善的功能

## 🔗 相关文档
- 关联文档链接
```

## 📖 文档编写指南

### 原则

1. **简洁明了**: 每个文档聚焦一个包，不要写得太冗长
2. **代码优先**: 用代码示例说明，而不是长篇大论
3. **留白空间**: 标注"待补充"的部分，方便后续迭代
4. **相互引用**: 通过链接关联相关文档

### 示例

参考已创建的文档：
- [core/auth.md](./packages/core/auth.md) - 较详细的实现说明
- [core/storage.md](./packages/core/storage.md) - 平台适配示例
- [web/router.md](./packages/web/router.md) - 简洁版文档

### 工具

```bash
# 检查文档链接有效性
pnpm exec markdown-link-check docs/**/*.md

# 格式化 Markdown
pnpm exec prettier --write docs/**/*.md
```

## 🔄 更新日志

| 日期 | 更新内容 | 作者 |
|-----|---------|------|
| 2026-01-25 | 初始化文档结构，创建核心包文档 | Claude |
| - | 待补充 | - |

## 🤝 贡献指南

### 添加新包文档

1. 在对应目录创建 `.md` 文件
2. 按照模板填写内容
3. 更新 `packages/README.md` 索引
4. 更新本文档的"待补充"列表

### 更新现有文档

1. 找到对应的 `.md` 文件
2. 补充"待补充内容"部分
3. 添加更多代码示例
4. 更新"最后更新"日期

## 🔗 外部资源

- [TanStack Router 文档](https://tanstack.com/router)
- [Jotai 文档](https://jotai.org)
- [Ant Design 文档](https://ant.design)
- [React 19 文档](https://react.dev)

---

**文档版本**: v1.0.0
**最后更新**: 2026-01-25
**维护者**: 项目团队
