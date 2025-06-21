import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UserService from '../infrastructure/UserService';
import { UserInput } from '../domain/user';

export const useUsers = () => {
  const queryClient = useQueryClient();
  const listQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => UserService.list(),
  });

  const create = useMutation({
    mutationFn: (data: UserInput) => UserService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<UserInput> }) =>
      UserService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  const toggleActive = useMutation({
    mutationFn: (id: number) => UserService.toggleActive(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  return { ...listQuery, create, update, toggleActive };
};
