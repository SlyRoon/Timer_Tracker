import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { AppRoute } from '../shared/routes';
import { AppControls } from './AppControls';

interface AppShellProps {
  activePath: AppRoute['path'];
  children: ReactNode;
  routes: AppRoute[];
}

export function AppShell({ activePath, children, routes }: AppShellProps) {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-neutral-50 text-zinc-950">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-10">
        <header className="flex flex-col gap-5 border-b border-zinc-200 pb-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-[rgb(var(--color-accent-text))]">
                {t('app.name')}
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">
                {t('app.workspace')}
              </h1>
            </div>

            <AppControls />
          </div>

          <nav
            aria-label={t('app.primaryNavigation')}
            className="flex max-w-full gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible"
          >
            {routes.map((route) => {
              const isActive = route.path === activePath;

              return (
                <a
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'shrink-0 rounded-md border px-4 py-2 text-sm font-medium transition',
                    isActive
                      ? 'border-[rgb(var(--color-accent))] bg-[rgb(var(--color-accent))] text-white'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:text-zinc-950',
                  ].join(' ')}
                  href={`#${route.path}`}
                  key={route.path}
                >
                  {t(route.labelKey)}
                </a>
              );
            })}
          </nav>
        </header>

        <section className="grid flex-1 gap-6 py-6 md:grid-cols-[200px_minmax(0,1fr)] lg:py-8">
          <aside className="rounded-lg border border-zinc-200 bg-white p-4">
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
