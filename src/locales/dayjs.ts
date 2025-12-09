import { locale } from 'dayjs';

import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import { config } from '@/config';

/**
 * Set dayjs locale
 *
 * @param lang
 */
export function setDayjsLocale() {
  const localMap = {
    'en-US': 'en',
    'zh-CN': 'zh-cn'
  } satisfies Record<I18n.LangType, string>;

  locale(localMap[config.defaultLang]);
}
