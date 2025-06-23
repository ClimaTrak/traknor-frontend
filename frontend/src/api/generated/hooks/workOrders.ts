import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '../client';
import type { WorkOrder, StatusChoice } from '../schemas';

export const useGetApiWorkOrders = (params: {
  page: number;
  search?: string;
  status?: string;
  priority?: string;
}) =>
  useQuery(['workorders', params], async () => {
    const { data } = await client.get<WorkOrder[]>('/api/work-orders/', {
      params,
    });
    return data;
  });

export const useGetApiWorkOrdersById = (id: number) =>
  useQuery(['workorder', id], async () => {
    const { data } = await client.get<WorkOrder>(`/api/work-orders/${id}/`);
    return data;
  });

export const useGetApiWorkOrdersStatusChoicesById = (id: number) =>
  useQuery(['workorder', id, 'choices'], async () => {
    const { data } = await client.get<StatusChoice[]>(
      `/api/work-orders/${id}/status-choices/`,
    );
    return data;
  });

export const usePatchApiWorkOrdersStatusById = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { status: string }) =>
      client
        .patch<WorkOrder>(`/api/work-orders/${id}/status/`, payload)
        .then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workorder', id] });
      queryClient.invalidateQueries({ queryKey: ['workorders'] });
    },
  });
};
