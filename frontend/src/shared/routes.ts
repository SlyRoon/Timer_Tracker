export interface AppRoute {
  labelKey: string;
  path: '/tracker' | '/projects' | '/reports';
}

export const appRoutes: AppRoute[] = [
  {
    labelKey: 'nav.tracker',
    path: '/tracker',
  },
  {
    labelKey: 'nav.projects',
    path: '/projects',
  },
  {
    labelKey: 'nav.reports',
    path: '/reports',
  },
];
