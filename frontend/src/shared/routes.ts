export interface AppRoute {
  label: string;
  path: '/tracker' | '/projects' | '/reports';
}

export const appRoutes: AppRoute[] = [
  {
    label: 'Tracker',
    path: '/tracker',
  },
  {
    label: 'Projects',
    path: '/projects',
  },
  {
    label: 'Reports',
    path: '/reports',
  },
];
