import { useEffect, useMemo, useState } from 'react';
import type { AppRoute } from '../shared/routes';

function getHashPath(fallbackPath: AppRoute['path'], validPaths: Set<string>) {
  const rawPath = window.location.hash.replace(/^#/, '');
  const normalizedPath = rawPath.startsWith('/') ? rawPath : fallbackPath;

  return validPaths.has(normalizedPath)
    ? (normalizedPath as AppRoute['path'])
    : fallbackPath;
}

export function useHashRoute(routes: AppRoute[]) {
  const fallbackPath = routes[0].path;
  const validPaths = useMemo(
    () => new Set(routes.map((route) => route.path)),
    [routes],
  );
  const [activePath, setActivePath] = useState<AppRoute['path']>(() =>
    getHashPath(fallbackPath, validPaths),
  );

  useEffect(() => {
    const syncRoute = () => setActivePath(getHashPath(fallbackPath, validPaths));

    syncRoute();
    window.addEventListener('hashchange', syncRoute);

    return () => window.removeEventListener('hashchange', syncRoute);
  }, [fallbackPath, validPaths]);

  return activePath;
}
