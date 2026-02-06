/**
 * 状态更新器类型
 * 支持直接传值或传入 updater 函数
 */
type StateUpdater<S> = S | ((prev: S) => S);

/**
 * 通用状态引擎基类
 *
 * 职责：
 * - 状态保存与更新（统一入口）
 * - 订阅 / 通知（Observer 模式）
 * - 提供 `subscribe` + `getSnapshot` 给 `useSyncExternalStore`
 *
 * 设计原则：
 * - 普通基类而非抽象类，保留最大灵活性
 * - 所有状态更新必须走 `setState`，禁止直接 `this.state = ...`
 * - `emit` 私有，杜绝"忘记通知"的问题
 */
export class Store<S> {
  /** 当前状态 */
  protected state: S;

  /** 订阅者集合 */
  private listeners = new Set<() => void>();

  constructor(initialState: S) {
    this.state = initialState;
  }

  /** 订阅状态变化（箭头函数保证 this 绑定） */
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  /** 获取当前状态快照（箭头函数保证 this 绑定） */
  getSnapshot = (): S => this.state;

  /**
   * 统一状态更新入口
   *
   * - 支持直接传值：`this.setState(nextState)`
   * - 支持 updater 函数：`this.setState(prev => newState)`
   * - Object.is 防止无意义更新
   */
  protected setState(nextOrUpdater: StateUpdater<S>) {
    const next = typeof nextOrUpdater === 'function' ? (nextOrUpdater as (prev: S) => S)(this.state) : nextOrUpdater;

    if (Object.is(next, this.state)) return;

    this.state = next;
    this.emit();
  }

  /** 通知所有订阅者 */
  private emit() {
    this.listeners.forEach(l => l());
  }
}
