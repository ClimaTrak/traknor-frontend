import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '../client';
import type { Equipment, EquipmentInput } from '../schemas';

export const useGetApiEquipment = (params: {
  page: number;
  page_size: number;
  nome?: string;
  categoria?: string;
  status?: string;
}) =>
  useQuery(['equipment', params], async () => {
    const { data } = await client.get<Equipment[]>('/api/equipment/', {
      params,
    });
    return data;
  });

export const usePostApiEquipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EquipmentInput) =>
      client.post<Equipment>('/api/equipment/', data).then((r) => r.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['equipment'] }),
  });
};

export const usePutApiEquipmentById = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EquipmentInput) =>
      client.put<Equipment>(`/api/equipment/${id}/`, data).then((r) => r.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['equipment'] }),
  });
};

export const useDeleteApiEquipmentById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      client.delete(`/api/equipment/${id}/`).then(() => undefined),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['equipment'] }),
  });
};

export const usePostApiEquipmentImport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: FormData) =>
      client.post('/api/equipment/import/', form).then((r) => r.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['equipment'] }),
  });
};
