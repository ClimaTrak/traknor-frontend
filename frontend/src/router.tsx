import {
  RouteObject,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import AppShell from './components/Layout/AppShell';
import StubPage from './pages/StubPage';
import DashboardView from './pages/Dashboard/DashboardView';
import ReportDownloader from './pages/Reports/ReportDownloader';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <StubPage title="Visão Geral" /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'ativos', element: <StubPage title="Ativos" /> },
      { path: 'ordens', element: <StubPage title="Ordens" /> },
      { path: 'solicitacoes', element: <StubPage title="Solicitações" /> },
      { path: 'planos', element: <StubPage title="Planos" /> },
      { path: 'metricas', element: <StubPage title="Métricas" /> },
      { path: 'usuarios', element: <StubPage title="Usuários" /> },
      { path: 'reports', element: <ReportDownloader /> },
    ],
  },
];

const router = createBrowserRouter(routes);

const Router = () => <RouterProvider router={router} />;

export default Router;
