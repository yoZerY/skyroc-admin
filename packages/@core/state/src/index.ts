// Provider
export { JotaiProvider } from './provider/JotaiProvider';
export type { JotaiProviderProps } from './provider/JotaiProvider';

// Store
export { getAtomValue, globalStore, setAtomValue, updateAtomValue } from './store/global';

// Utils
export { atomWithPartial } from './utils/atom-with-partial';
export type { PartialUpdater } from './utils/atom-with-partial';
export { createAtomWithStorage } from './utils/atom-with-storage';
export type { CreateAtomWithStorageOptions } from './utils/atom-with-storage';
export {
  __clearStorageRegistry,
  getStorage,
  hasStorage,
  registerStorage,
  unregisterStorage
} from './utils/storage-registry';

// Types
export type { AtomStorage } from './types';
