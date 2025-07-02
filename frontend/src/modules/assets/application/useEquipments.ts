import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import EquipmentService from '../infrastructure/EquipmentService';
import { EquipmentInput } from '../domain/equipment';

/**
 * Hook que centraliza as operações de consulta e mutação de equipamentos.
 */

/**
 * Interface de acesso aos equipamentos utilizando React Query.
 */
export const useEquipments = () => {
  const queryClient = useQueryClient();
  const listQuery = useQuery({
    queryKey: ['equipments'],
    queryFn: () => EquipmentService.list(),
  });

  const create = useMutation({
    mutationFn: (data: EquipmentInput) => EquipmentService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['equipments'] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: EquipmentInput }) =>
      EquipmentService.update(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['equipments'] }),
  });

  const remove = useMutation({
    mutationFn: (id: number) => EquipmentService.remove(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['equipments'] }),
  });

  return { ...listQuery, create, update, remove };
};
