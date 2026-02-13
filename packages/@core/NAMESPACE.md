# @core 命名空间

## 定位

`@core` 是项目的**基础设施层**，存放框架无关或轻度依赖 React 的核心能力包。

放在这里的标准：

- 跨平台（Web / React Native / Node 均可使用，或仅需 React 而不依赖浏览器 API）
- 与业务逻辑无关，属于通用基础能力
- 有独立的职责边界，不与其他 @core 包循环依赖

不放在这里的：业务组件、页面级逻辑、特定平台才能用的 hooks（放 `packages/hooks`、`packages/ui` 等）。

## 当前包列表

```text
packages/@core/
├── types/       @skyroc/core-types    全局类型定义（零运行时依赖）
├── utils/       @skyroc/utils         通用工具函数（纯函数集合）
├── color/       @skyroc/color         颜色处理工具
├── axios/       @skyroc/axios         HTTP 客户端封装
├── state/       @skyroc/core-state    Jotai 状态管理封装（依赖 React）
├── logger/      @skyroc/logger        跨平台日志系统
├── scheduler/   @skyroc/scheduler     协作式任务调度（初始化、定时器、监听器统一管理）
└── scripts/     内部构建脚本
```

### 各包简述

| 包 | 说明 | React 依赖 |
| --- | --- | --- |
| `types` | `.d.ts` 全局类型声明，零依赖，所有包均可引用 | 无 |
| `utils` | 日期、加密、数组/对象操作、正则等纯函数，主入口 + `./web` 子路径 | 无 |
| `color` | 颜色转换、混合、主题色生成 | 无 |
| `axios` | 基于 axios 的请求/响应拦截器、实例创建工具 | 无 |
| `state` | Jotai 原子状态封装、全局 store、持久化 atom、storage registry | 是 |
| `logger` | 基于 LogLayer 的日志系统，适配 Web / RN / 小程序，含上传、清理、白名单管理 | 无 |
| `scheduler` | 协作式任务调度中枢，统一管理 init / periodic / listener 三类任务，支持依赖 DAG、重试、暂停恢复 | 无 |

## 依赖方向

```text
types（零依赖）
  ↑
utils / color / axios（基础工具，互不依赖）
  ↑
state / logger / scheduler（运行时系统，可依赖上层基础工具）
```

箭头表示"被依赖"方向。禁止同层或反向依赖。

---

**最后更新**: 2026-02-13
