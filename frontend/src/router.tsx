import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './presentation/components/layout/AppLayout';
import Login from './presentation/pages/Auth/Login';
import ForgotPassword from './presentation/pages/Auth/ForgotPassword';
import DashboardPage from './presentation/pages/DashboardPage';
import Overview from './presentation/pages/Overview';
import EquipamentosPage from './modules/assets/presentation/EquipamentosPage';
import UsuariosPage from './modules/users/presentation/UsuariosPage';
import WorkOrders from './presentation/pages/WorkOrders';
import Plans from './presentation/pages/Plans';
import Metrics from './presentation/pages/Metrics';
import Reports from './presentation/pages/Reports';
import PrivateRoute from './components/routes/PrivateRoute';
import { useAuth } from './hooks/useAuth';
import { getHomeByRole } from './utils/getHomeByRole';

const Router = () => {
  const { access, role } = useAuth();
  const home = getHomeByRole(role);
  return (
    <Routes>
      <Route path="/login" element={access ? <Navigate to={home} replace /> : <Login />} />
      <Route path="/password-reset" element={access ? <Navigate to={home} replace /> : <ForgotPassword />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to={home} replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="overview" element={<Overview />} />
        <Route path="equipamentos" element={<EquipamentosPage />} />
        <Route path="usuarios" element={<UsuariosPage />} />
        <Route path="work-orders" element={<WorkOrders />} />
        <Route path="plans" element={<Plans />} />
        <Route path="metrics" element={<Metrics />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<Navigate to={home} replace />} />
    </Routes>
  );
};

export default Router;
