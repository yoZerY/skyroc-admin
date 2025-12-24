/**
 * i18n type definition
 * This file aggregates all i18n type definitions from separate module files
 *
 * Type files are organized by module:
 * - route.d.ts: Route related types
 * - common.d.ts: Common UI text types
 * - form.d.ts: Form validation types
 * - datatable.d.ts: Datatable types
 * - icon.d.ts: Icon types
 * - dropdown.d.ts: Dropdown types
 * - page.d.ts: Page specific types
 * - request.d.ts: Request types
 * - system.d.ts: System types
 * - theme.d.ts: Theme types
 *
 * All type files are automatically included by TypeScript and merged into the App.I18n namespace
 */

declare namespace I18n {
  type LangType = 'en-US' | 'zh-CN';

  type LangOption = {
    key: LangType;
    label: string;
  };

  type Schema = {
    translation: {
      common: Common;
      datatable: Datatable;
      dropdown: Record<App.Global.DropdownKey, string>;
      form: Form;
      icon: Icon;
      page: Page;
      request: Request;
      route: Route;
      system: System;
      theme: Theme;
    };
  };

  type GetI18nKey<T extends Record<string, unknown>, K extends keyof T = keyof T> = K extends string
    ? T[K] extends Record<string, unknown>
      ? `${K}.${GetI18nKey<T[K]>}`
      : K
    : never;

  type I18nKey = GetI18nKey<Schema['translation']>;

  type TranslateOptions<Locales extends string> = import('react-i18next').TranslationProps<Locales>;

  interface $T {
    (key: I18nKey): string;
    (key: I18nKey, plural: number, options?: TranslateOptions<LangType>): string;
    (key: I18nKey, defaultMsg: string, options?: TranslateOptions<I18nKey>): string;
    (key: I18nKey, list: unknown[], options?: TranslateOptions<I18nKey>): string;
    (key: I18nKey, list: unknown[], plural: number): string;
    (key: I18nKey, list: unknown[], defaultMsg: string): string;
    (key: I18nKey, named: Record<string, unknown>, options?: TranslateOptions<LangType>): string;
    (key: I18nKey, named: Record<string, unknown>, plural: number): string;
    (key: I18nKey, named: Record<string, unknown>, defaultMsg: string): string;
  }
}
