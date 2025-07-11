import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '@/presentation/components/layout/AppLayout';
import Overview from '@/presentation/pages/Overview';
import EquipmentList from '@/pages/Equipment/EquipmentList';
import ImportCsvModal from '@/pages/Equipment/ImportCsvModal';
import EquipmentFormModal from '@/pages/Equipment/EquipmentFormModal';
import UsuariosPage from '@/modules/users/presentation/UsuariosPage';
import WorkOrderInbox from '@/pages/WorkOrders/WorkOrderInbox';
import Plans from '@/presentation/pages/Plans';
import Metrics from '@/presentation/pages/Metrics';
import Reports from '@/presentation/pages/Reports';
import DashboardPage from '@/presentation/pages/DashboardPage';
import LoginPage from '@/pages/Login';
import AuthGuard from '@/components/routes/AuthGuard';
import useIsAuthenticated from '@/application/hooks/useIsAuthenticated';

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
        <Route path="dashboard/*" element={<DashboardPage />}>
          <Route path="import-csv" element={<ImportCsvModal />} />
          <Route path="new" element={<EquipmentFormModal />} />
        </Route>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="equipamentos" element={<EquipmentList />} />
        <Route path="usuarios" element={<UsuariosPage />} />
        <Route path="work-orders/*" element={<WorkOrderInbox />} />
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
