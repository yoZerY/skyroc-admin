# 迁移指南

> 从 monolithic apps/admin 到细粒度包的迁移步骤

## 📋 迁移概览

### 迁移原则

1. **渐进式**: 一次迁移一个包，不影响现有功能
2. **向后兼容**: 保留旧代码，直到新包稳定,但是要引用新的代码,我会主动的删除已经稳定的代码
3. **测试驱动**: 每个包迁移后都要测试
4. **文档同步**: 及时更新文档

### 迁移阶段

```
阶段 1: 基础包 (1-2周)     核心类型、常量、存储等无依赖包
     ↓
阶段 2: 核心逻辑包 (2周)   认证、主题、国际化等核心功能
     ↓
阶段 3: Web 专用包 (2-3周) 路由、表格、表单等 Web 功能
     ↓
阶段 4: 适配器包 (1周)     UI 库适配层
     ↓
阶段 5: 优化测试 (1周)     性能优化、测试覆盖、文档完善
```

## 🚀 阶段 1: 基础包迁移

### 1.1 创建包结构脚本

```bash
#!/bin/bash
# scripts/create-package.sh

PACKAGE_NAME=$1
PACKAGE_TYPE=$2  # core/web/adapter/feature

mkdir -p "packages/${PACKAGE_TYPE}-${PACKAGE_NAME}/src"
cd "packages/${PACKAGE_TYPE}-${PACKAGE_NAME}"

# 创建 package.json
cat > package.json <<EOF
{
  "name": "@skyroc/${PACKAGE_TYPE}-${PACKAGE_NAME}",
  "version": "1.0.0",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {}
}
EOF

# 创建 index.ts
touch src/index.ts

# 创建 README.md
echo "# @skyroc/${PACKAGE_TYPE}-${PACKAGE_NAME}" > README.md

echo "✅ Package created: @skyroc/${PACKAGE_TYPE}-${PACKAGE_NAME}"
```

使用:
```bash
chmod +x scripts/create-package.sh
./scripts/create-package.sh types core
./scripts/create-package.sh constants core
```

### 1.2 迁移 @skyroc/core-types

**步骤**:

1. 创建包
```bash
./scripts/create-package.sh types core
```

2. 迁移类型文件
```bash
cp -r apps/admin/src/types/* packages/core-types/src/
```

3. 创建入口文件
```ts
// packages/core-types/src/index.ts
export * from './app/global'
export * from './app/theme'
export * from './common'
// ... 导出所有类型
```

4. 在应用中使用
```bash
cd apps/admin
pnpm add @skyroc/core-types@workspace:*
```

```ts
// apps/admin/src/xxx.ts
// 旧代码
import type { User } from '@/types/common'

// 新代码
import type { User } from '@skyroc/core-types'
```

5. 验证
```bash
pnpm typecheck
```

### 1.3 迁移 @skyroc/core-constants

类似步骤，迁移 `apps/admin/src/constants/` 到新包。

### 1.4 迁移 @skyroc/core-storage

见 [docs/packages/core/storage.md](./packages/core/storage.md)

## 🔧 阶段 2: 核心逻辑包迁移

### 2.1 迁移 @skyroc/core-auth

见 [docs/packages/core/auth.md](./packages/core/auth.md)

**关键点**:
- 拆分纯状态管理逻辑
- 移除对 API、菜单的依赖
- 这些依赖放在应用层处理

### 2.2 迁移 @skyroc/core-theme

见 [docs/packages/core/theme.md](./packages/core/theme.md)

**关键点**:
- 移除 DOM 操作（CSS 变量注入）
- 保留纯主题计算逻辑
- DOM 操作在应用层的 ThemeEffect 组件处理

### 2.3 迁移 @skyroc/core-i18n

**从**:
```
apps/admin/src/features/lang/
```

**到**:
```
packages/core-i18n/src/
```

## 🌐 阶段 3: Web 专用包迁移

### 3.1 迁移 @skyroc/web-router

见 [docs/packages/web/router.md](./packages/web/router.md)

### 3.2 迁移 @skyroc/web-table

**从**:
```
apps/admin/src/features/table/
```

**到**:
```
packages/web-table/src/
```

## 🔌 阶段 4: 适配器包迁移

### 4.1 迁移 @skyroc/adapter-antd

见 [docs/packages/adapter/antd.md](./packages/adapter/antd.md)

## ✅ 阶段 5: 优化和测试

### 5.1 依赖检查

```bash
# 检查循环依赖
pnpm exec madge --circular packages/*/src/index.ts

# 检查未使用依赖
pnpm exec depcheck
```

### 5.2 性能测试

```bash
# Bundle 大小分析
pnpm build
pnpm exec bundlesize
```

### 5.3 测试覆盖率

```bash
# 运行所有测试
pnpm test

# 生成覆盖率报告
pnpm test:coverage
```

## 🛠️ 工具和脚本

### 自动更新导入路径

```ts
// scripts/update-imports.ts
import { Project } from 'ts-morph'

const project = new Project({
  tsConfigFilePath: 'tsconfig.json'
})

// 查找所有 import from '@/features/auth'
// 替换为 import from '@skyroc/core-auth'

// TODO: 实现具体逻辑
```

### 包依赖可视化

```bash
pnpm exec nx graph
```

## 📝 迁移检查清单

### 每个包迁移完成后检查

- [ ] 包结构符合规范
- [ ] package.json 配置正确
- [ ] 类型导出完整
- [ ] 文档已创建/更新
- [ ] 测试用例已添加
- [ ] 应用中已更新导入
- [ ] TypeScript 编译通过
- [ ] 测试通过
- [ ] 无循环依赖
- [ ] Git commit 已提交

## 🔗 相关文档

- [PACKAGE_SPLIT_ARCHITECTURE.md](../PACKAGE_SPLIT_ARCHITECTURE.md) - 架构方案
- [docs/packages/](./packages/) - 包实现文档

---

**最后更新**: 2026-01-25
