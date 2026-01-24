# @skyroc/feature-menu

> 菜单系统 - 跨平台支持

## 📦 包信息

- **包名**: `@skyroc/feature-menu`
- **版本**: `1.0.0`
- **平台**: Universal (Web + React Native)
- **依赖**:
  - `@skyroc/core-state` - 状态管理
  - `@skyroc/core-types` - 类型定义

## 🎯 职责定位

**核心职责**:
- 菜单配置生成
- 菜单状态管理
- 路由与菜单映射

## 📐 目录结构

```
@skyroc/feature-menu/
├── src/
│   ├── atoms/
│   │   └── menu.ts              # 菜单 atom
│   ├── hooks/
│   │   └── use-menus.ts         # 菜单 hook
│   ├── utils/
│   │   ├── generator.ts         # 菜单生成器
│   │   └── transformer.ts       # 菜单转换
│   ├── types/
│   │   └── index.ts
│   └── index.ts
└── package.json
```

## 🔌 API 设计

```ts
export { useMenus } from './hooks/use-menus'
export { generateMenus, transformMenuToRoute } from './utils'
export type { MenuItem, MenuConfig } from './types'
```

## 🔨 核心实现

### Menu Atom

```ts
// src/atoms/menu.ts
import { atom } from '@skyroc/core-state'
import type { Menu } from '@skyroc/core-types'

interface MenusAtom {
  menus: Menu.Menus
  quickReferenceMenus: Menu.QuickReferenceMenus
}

const initState: MenusAtom = {
  menus: new Map(),
  quickReferenceMenus: new Map()
}

export const menusAtom = atom(initState, (get, set, update: Partial<MenusAtom>) => {
  set(menusAtom, { ...get(menusAtom), ...update })
})
```

### useMenus Hook

```ts
// src/hooks/use-menus.ts
import { useAtom } from '@skyroc/core-state'
import { menusAtom } from '../atoms/menu'
import { menuGenerator } from '../utils/generator'

export function useMenus() {
  const [menusState, setMenusState] = useAtom(menusAtom)

  function initMenus() {
    const { allMenus, quickReferenceMenus } = menuGenerator.generate()
    setMenusState({ menus: allMenus, quickReferenceMenus })
  }

  function clearMenus() {
    setMenusState({ menus: new Map(), quickReferenceMenus: new Map() })
  }

  return {
    ...menusState,
    initMenus,
    clearMenus
  }
}
```

### Menu Generator

```ts
// src/utils/generator.ts
import type { Menu } from '@skyroc/core-types'

class MenuGenerator {
  generate() {
    // 从路由配置生成菜单
    const allMenus = new Map<string, Menu.MenuItem[]>()
    const quickReferenceMenus = new Map<string, Menu.MenuItem>()

    // TODO: 实现菜单生成逻辑

    return { allMenus, quickReferenceMenus }
  }
}

export const menuGenerator = new MenuGenerator()
```

## 💡 使用示例

```tsx
import { useMenus } from '@skyroc/feature-menu'

function Sidebar() {
  const { menus, initMenus } = useMenus()

  useEffect(() => {
    initMenus()
  }, [])

  return (
    <nav>
      {Array.from(menus.values()).map(menu => (
        <div key={menu.key}>{menu.label}</div>
      ))}
    </nav>
  )
}
```

## 📝 待补充内容

- [ ] 菜单权限控制
- [ ] 菜单搜索
- [ ] 收藏夹功能
- [ ] 历史记录

---

**最后更新**: 2026-01-25
