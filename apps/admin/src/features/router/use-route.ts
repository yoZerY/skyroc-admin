import { useChildMatches } from '@tanstack/react-router';

import { normalizePath } from '../menus/menu-generator';

import { stringifyQuery } from './query';

export function useRoute() {
  const route = useChildMatches({
    select: matches => {
      const m = matches[matches.length - 1];

      const qs = stringifyQuery(m.search);

      const fullPath = qs ? `${m.pathname}${qs}` : m.pathname;

      return {
        routeId: m.routeId,
        params: m.params,
        pathname: m.pathname,
        fullPath,
        staticData: m.staticData,
        searchStr: qs,
        originPath: normalizePath(m.fullPath) as Router.RoutePath,
        search: m.search
      };
    },
    structuralSharing: false
  });

  return route;
}
