import 'i18next';

declare module 'i18next' {
  type TranslationSchema = I18n.Schema['translation'];

  interface CustomTypeOptions {
    resources: {
      translation: TranslationSchema;
    };
  }
}
