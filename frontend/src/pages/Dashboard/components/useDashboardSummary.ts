import { useGetApiDashboardSummary } from '@/api/generated/hooks/dashboardSummary';

const useDashboardSummary = () =>
  useGetApiDashboardSummary({ refetchInterval: 60_000 });

export default useDashboardSummary;
