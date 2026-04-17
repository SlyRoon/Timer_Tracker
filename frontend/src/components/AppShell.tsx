import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LuChartBar, LuClock3, LuFolderKanban } from 'react-icons/lu';
import type { AppRoute } from '../shared/routes';
import { AppControls } from './AppControls';

interface AppShellProps {
  activePath: AppRoute['path'];
  children: ReactNode;
  routes: AppRoute[];
}

const routeIcons = {
  '/projects': LuFolderKanban,
  '/reports': LuChartBar,
  '/tracker': LuClock3,
} satisfies Record<AppRoute['path'], typeof LuClock3>;

export function AppShell({ activePath, children, routes }: AppShellProps) {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-950">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[rgb(var(--color-accent))] text-white shadow-sm">
                  <LuClock3 className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[rgb(var(--color-accent-text))]">
                    {t('app.name')}
                  </p>
                  <h1 className="text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">
                    {t('app.workspace')}
                  </h1>
                </div>
              </div>
            </div>

            <AppControls />
          </div>

          <nav
            aria-label={t('app.primaryNavigation')}
            className="mt-5 flex max-w-full gap-2 overflow-x-auto border-t border-zinc-100 pt-4 sm:flex-wrap sm:overflow-visible"
          >
            {routes.map((route) => {
              const isActive = route.path === activePath;
              const Icon = routeIcons[route.path];

              return (
                <a
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'inline-flex shrink-0 items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'border-[rgb(var(--color-accent))] bg-[rgb(var(--color-accent))] text-white'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 hover:bg-white hover:text-zinc-950',
                  ].join(' ')}
                  href={`#${route.path}`}
                  key={route.path}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {t(route.labelKey)}
                </a>
              );
            })}
          </nav>
        </header>

        <section className="grid flex-1 gap-5 py-5 md:grid-cols-[210px_minmax(0,1fr)] lg:gap-7 lg:py-7">
          <aside className="h-fit rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-zinc-950">
              {t('app.foundation')}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600">
              <li>{t('app.foundationItems.shell')}</li>
              <li>{t('app.foundationItems.routing')}</li>
              <li>{t('app.foundationItems.api')}</li>
              <li>{t('app.foundationItems.types')}</li>
            </ul>
          </aside>

          <div className="min-w-0">{children}</div>
        </section>
      </div>
    </main>
  );
}
