import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Overview from './pages/Overview';
import Assets from './pages/Assets';
import WorkOrders from './pages/WorkOrders';
import Plans from './pages/Plans';
import Metrics from './pages/Metrics';
import Reports from './pages/Reports';

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/app/overview" replace />} />
    <Route path="/app" element={<AppLayout />}> 
      <Route path="overview" element={<Overview />} />
      <Route path="assets" element={<Assets />} />
      <Route path="work-orders" element={<WorkOrders />} />
      <Route path="plans" element={<Plans />} />
      <Route path="metrics" element={<Metrics />} />
      <Route path="reports" element={<Reports />} />
    </Route>
  </Routes>
);

export default App;
