/**
 * i18n type definition
 * This file aggregates all i18n type definitions from separate module files
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

  type Common = {
    action: string;
    add: string;
    addSuccess: string;
    backToHome: string;
    batchDelete: string;
    cancel: string;
    check: string;
    close: string;
    columnSetting: string;
    config: string;
    confirm: string;
    confirmDelete: string;
    delete: string;
    deleteSuccess: string;
    edit: string;
    error: string;
    errorHint: string;
    expandColumn: string;
    index: string;
    keywordSearch: string;
    logout: string;
    logoutConfirm: string;
    lookForward: string;
    modify: string;
    modifySuccess: string;
    noData: string;
    operate: string;
    pleaseCheckValue: string;
    refresh: string;
    reset: string;
    search: string;
    switch: string;
    tip: string;
    trigger: string;
    tryAlign: string;
    update: string;
    updateSuccess: string;
    userCenter: string;
    warning: string;
    yesOrNo: {
      no: string;
      yes: string;
    };
  };

  type RouteKey = string;

  type ReplaceSlash<S extends string> = S extends `${infer A}/${infer B}` ? `${A}_${ReplaceSlash<B>}` : S;

  type TransformPath<P extends string> = P extends '/'
    ? 'home'
    : P extends `/${infer Rest}`
      ? ReplaceSlash<Rest>
      : never;

  type I18nRouteKey = string;

  type I18nRouteMap = Record<I18nRouteKey, string>;

  type Route = Record<I18nRouteKey, string> & {
    notFound: string;
    root: string;
  };

  type Datatable = Record<string, string>;
  type Form = Record<string, string>;
  type Icon = Record<string, string>;
  type Page = Record<string, string>;
  type Request = Record<string, string>;
  type System = Record<string, string>;
  type Theme = Record<string, string>;
}

export type { I18n };
