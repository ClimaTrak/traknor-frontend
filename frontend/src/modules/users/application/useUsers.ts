import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UserService from '../infrastructure/UserService';
import { UserInput } from '../domain/user';

/**
 * Hook que centraliza as operações de consulta e mutação de usuários.
 *
 * Utiliza React Query para gerenciar cache e estados de carregamento de forma
 * consistente em toda a aplicação.
 */

export const useUsers = () => {
  const queryClient = useQueryClient();
  const listQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => UserService.list(),
  });

  // Criação de usuário
  const create = useMutation({
    mutationFn: (data: UserInput) => UserService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  // Atualização de usuário
  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<UserInput> }) =>
      UserService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  // Ativação/desativação
  const toggleActive = useMutation({
    mutationFn: (id: number) => UserService.toggleActive(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  return { ...listQuery, create, update, toggleActive };
};
