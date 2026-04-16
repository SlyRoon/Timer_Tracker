import type { ReactNode } from 'react';
import type { AppRoute } from '../shared/routes';

interface AppShellProps {
  activePath: AppRoute['path'];
  children: ReactNode;
  routes: AppRoute[];
}

export function AppShell({ activePath, children, routes }: AppShellProps) {
  return (
    <main className="min-h-screen bg-neutral-50 text-zinc-950">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-5 border-b border-zinc-200 pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">
              Time Tracker
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-zinc-950">
              Workspace
            </h1>
          </div>

          <nav aria-label="Primary navigation" className="flex flex-wrap gap-2">
            {routes.map((route) => {
              const isActive = route.path === activePath;

              return (
                <a
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'rounded-md border px-4 py-2 text-sm font-medium transition',
                    isActive
                      ? 'border-emerald-700 bg-emerald-700 text-white'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:text-zinc-950',
                  ].join(' ')}
                  href={`#${route.path}`}
                  key={route.path}
                >
                  {route.label}
                </a>
              );
            })}
          </nav>
        </header>

        <section className="grid flex-1 gap-6 py-8 md:grid-cols-[220px_1fr]">
          <aside className="rounded-lg border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-950">Foundation</p>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600">
              <li>App shell</li>
              <li>Routing</li>
              <li>API layer</li>
              <li>Shared types</li>
            </ul>
          </aside>

          <div className="min-w-0">{children}</div>
        </section>
      </div>
    </main>
  );
}
