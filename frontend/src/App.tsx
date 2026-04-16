import { AppShell } from './components/AppShell';
import { useHashRoute } from './hooks/useHashRoute';
import { ProjectsPage } from './pages/ProjectsPage';
import { ReportsPage } from './pages/ReportsPage';
import { TrackerPage } from './pages/TrackerPage';
import { appRoutes } from './shared/routes';

const pageByPath = {
  '/tracker': <TrackerPage />,
  '/projects': <ProjectsPage />,
  '/reports': <ReportsPage />,
};

function App() {
  const activePath = useHashRoute(appRoutes);

  return (
    <AppShell activePath={activePath} routes={appRoutes}>
      {pageByPath[activePath]}
    </AppShell>
  );
}

export default App;
