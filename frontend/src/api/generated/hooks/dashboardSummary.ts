import { useQuery } from '@tanstack/react-query';
import { client } from '../client';

export interface DashboardSummary {
  mttr_hours: number;
  mtbf_hours: number;
  open_os: number;
  closed_os: number;
}

export const useGetApiDashboardSummary = (options?: { refetchInterval?: number }) =>
  useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      const { data } = await client.get<DashboardSummary>('/api/dashboard/summary/');
      return data;
    },
    refetchInterval: options?.refetchInterval,
  });
