import { createStore } from 'jotai';

/**
 * - 用于非hook方式修改jotai
 * - 详见 [Jotai Store](https://jotai.org/docs/core/store)
 */
export const globalStore = createStore();
