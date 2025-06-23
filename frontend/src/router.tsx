import { RouteObject, createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppShell from './components/Layout/AppShell';
import StubPage from './pages/StubPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <StubPage title="Visão Geral" /> },
      { path: 'ativos', element: <StubPage title="Ativos" /> },
      { path: 'ordens', element: <StubPage title="Ordens" /> },
      { path: 'solicitacoes', element: <StubPage title="Solicitações" /> },
      { path: 'planos', element: <StubPage title="Planos" /> },
      { path: 'metricas', element: <StubPage title="Métricas" /> },
      { path: 'usuarios', element: <StubPage title="Usuários" /> },
      { path: 'relatorios', element: <StubPage title="Relatórios" /> },
    ],
  },
];

const router = createBrowserRouter(routes);

const Router = () => <RouterProvider router={router} />;

export default Router;
