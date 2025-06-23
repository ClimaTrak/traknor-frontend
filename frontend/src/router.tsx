import {
  RouteObject,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import AppShell from './components/Layout/AppShell';
import StubPage from './pages/StubPage';
import DashboardView from './pages/Dashboard/DashboardView';
import ReportDownloader from './pages/Reports/ReportDownloader';
import RoleRoute from './router/RoleRoute';
import Forbidden from './pages/Error/Forbidden';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <StubPage title="Visão Geral" /> },
      {
        element: <RoleRoute allowedRoles={['admin', 'manager', 'technician']} />,
        children: [{ path: 'dashboard', element: <DashboardView /> }],
      },
      { path: 'ativos', element: <StubPage title="Ativos" /> },
      { path: 'ordens', element: <StubPage title="Ordens" /> },
      { path: 'solicitacoes', element: <StubPage title="Solicitações" /> },
      { path: 'planos', element: <StubPage title="Planos" /> },
      { path: 'metricas', element: <StubPage title="Métricas" /> },
      {
        element: <RoleRoute allowedRoles={['admin']} />,
        children: [{ path: 'usuarios', element: <StubPage title="Usuários" /> }],
      },
      {
        element: <RoleRoute allowedRoles={['admin', 'manager']} />,
        children: [{ path: 'reports', element: <ReportDownloader /> }],
      },
      {
        element: <RoleRoute allowedRoles={['technician']} />,
        children: [{ path: 'work-orders/my', element: <StubPage title="Minhas OS" /> }],
      },
    ],
  },
  { path: '403', element: <Forbidden /> },
];

const router = createBrowserRouter(routes);

const Router = () => <RouterProvider router={router} />;

export default Router;
