import { setDayjsLocale } from '@/locales/dayjs';

import { useLang } from './use-lang';

const LangEffect = () => {
  const { locale } = useLang();

  useEffect(() => {
    setDayjsLocale(locale);
  }, [locale]);

  return null;
};

export default LangEffect;
