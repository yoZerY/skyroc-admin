import enUS from './langs/en-us';
import zhCN from './langs/zh-cn';

const locales: Record<I18n.LangType, I18n.Schema> = {
  'en-US': {
    translation: enUS
  },
  'zh-CN': {
    translation: zhCN
  }
};

export default locales;
