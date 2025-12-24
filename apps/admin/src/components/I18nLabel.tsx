import { Translation } from 'react-i18next';

import { reactI18nextInstance } from '@/locales';

interface I18nLabelProps {
  fallback?: React.ReactNode;
  i18nKey?: I18n.I18nKey | string | null;
}

const I18nLabel = ({ fallback, i18nKey }: I18nLabelProps) => {
  return <Translation i18n={reactI18nextInstance}>{t => (i18nKey ? t(i18nKey) : fallback)}</Translation>;
};

export default I18nLabel;
