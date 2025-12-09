declare namespace I18n {
  type AllPaths = import('@/features/router/routeTree.gen').FileRoutesByFullPath;

  type RouteKey = keyof AllPaths;

  type ReplaceSlash<S extends string> = S extends `${infer A}/${infer B}` ? `${A}_${ReplaceSlash<B>}` : S;

  type TransformPath<P extends string> = P extends '/'
    ? 'home'
    : P extends `/${infer Rest}`
      ? ReplaceSlash<Rest>
      : never;

  type I18nRouteKey = TransformPath<RouteKey>;

  type I18nRouteMap = Record<I18nRouteKey, string>;

  type Route = Record<I18nRouteKey, string> & {
    notFound: string;
    root: string;
  };
}
