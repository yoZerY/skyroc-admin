import type { ReactNode } from 'react';
import type { i18n } from 'i18next';
import { Translation } from 'react-i18next';

interface I18nLabelProps {
  /** Fallback content when i18nKey is not provided */
  fallback?: ReactNode;
  /** i18n instance (optional, uses default if not provided) */
  i18n?: i18n;
  /** i18n translation key */
  i18nKey?: string | null;
}

const I18nLabel = ({ fallback, i18n: i18nInstance, i18nKey }: I18nLabelProps) => {
  return <Translation i18n={i18nInstance}>{t => (i18nKey ? t(i18nKey) : fallback)}</Translation>;
};

export default I18nLabel;
