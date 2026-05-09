import type { ResourceLanguage } from 'i18next';

import { localeResources } from './langs';
import type { LangType } from './types';

interface LocaleSchema {
  /** i18next translation resource for one admin locale. */
  translation: ResourceLanguage;
}

export const locales: Record<LangType, LocaleSchema> = {
  'en-US': {
    translation: localeResources['en-US']
  },
  'zh-CN': {
    translation: localeResources['zh-CN']
  }
};

export default locales;
