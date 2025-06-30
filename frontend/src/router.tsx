import {
  RouteObject,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Loader } from '@mantine/core';
import { AppShell } from './components';
const StubPage = lazy(() => import('./pages/StubPage'));
const DashboardView = lazy(() => import('./pages/Dashboard/DashboardView'));
const ReportDownloader = lazy(() => import('./pages/Reports/ReportDownloader'));
import RoleRoute from './router/RoleRoute';
const Forbidden = lazy(() => import('./pages/Error/Forbidden'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <StubPage title="Visão Geral" /> },
      {
        element: (
          <RoleRoute allowedRoles={['admin', 'manager', 'technician']} />
        ),
        children: [{ path: 'dashboard', element: <DashboardView /> }],
      },
      { path: 'ativos', element: <StubPage title="Ativos" /> },
      { path: 'ordens', element: <StubPage title="Ordens" /> },
      { path: 'solicitacoes', element: <StubPage title="Solicitações" /> },
      { path: 'planos', element: <StubPage title="Planos" /> },
      { path: 'metricas', element: <StubPage title="Métricas" /> },
      {
        element: <RoleRoute allowedRoles={['admin']} />,
        children: [
          { path: 'usuarios', element: <StubPage title="Usuários" /> },
        ],
      },
      {
        element: <RoleRoute allowedRoles={['admin', 'manager']} />,
        children: [{ path: 'reports', element: <ReportDownloader /> }],
      },
      {
        element: <RoleRoute allowedRoles={['technician']} />,
        children: [
          { path: 'work-orders/my', element: <StubPage title="Minhas OS" /> },
        ],
      },
    ],
  },
  { path: '403', element: <Forbidden /> },
];

const router = createBrowserRouter(routes);

const Router = () => (
  <Suspense fallback={<Loader />}>
    <RouterProvider router={router} />
  </Suspense>
);

export default Router;
