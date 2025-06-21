import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../presentation/components/layout/AppLayout';
import Overview from '../presentation/pages/Overview';
import Assets from '../presentation/pages/Assets';
import WorkOrders from '../presentation/pages/WorkOrders';
import Plans from '../presentation/pages/Plans';
import Metrics from '../presentation/pages/Metrics';
import Reports from '../presentation/pages/Reports';
import DashboardPage from '../presentation/pages/DashboardPage';
import LoginPage from '../presentation/pages/LoginPage';
import AuthGuard from '../components/routes/AuthGuard';
import useIsAuthenticated from '../application/hooks/useIsAuthenticated';

const Router = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/app/*"
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="overview" element={<Overview />} />
        <Route path="assets" element={<Assets />} />
        <Route path="work-orders" element={<WorkOrders />} />
        <Route path="plans" element={<Plans />} />
        <Route path="metrics" element={<Metrics />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? '/app/overview' : '/login'} replace />
        }
      />
    </Routes>
  );
};

export default Router;
