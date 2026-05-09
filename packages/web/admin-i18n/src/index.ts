// Atoms
export { currentLangOptionAtom, fallbackLangAtom, langAtom, localeOptionsAtom } from './atoms/lang';
// Config
export { defaultLangConfig } from './config/default';
export { getCurrentLang, initI18n, loadLocaleMessages, setLng } from './config/i18n';
export { default as LangEffect } from './features/lang/LangEffect';

export { default as LangSwitch } from './features/lang/LangSwitch';

// Hooks
export { useLang } from './hooks/use-lang';
export type { UseLangReturn } from './hooks/use-lang';

// Runtime
export { $t, i18n, reactI18nextInstance, setupI18n } from './i18n';
export { default as locales, locales as adminLocales } from './locales';

// Types
export type {
  LangConfig,
  LangOption,
  LangType,
  LocaleChangeHandler,
  LocaleSetupOptions,
  LocaleStorage
} from './types';

// Utils
export { getLangFromStorage, getLangLabel, saveLangToStorage } from './utils/helpers';
