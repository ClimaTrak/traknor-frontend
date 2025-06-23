import { Button, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  useStatusChoices,
  useTransitionStatus,
} from '@/modules/workorders/application/useWorkOrders';

interface Props {
  id: number;
  role: string | null;
}

const StatusTransitionButtons = ({ id, role }: Props) => {
  const { data: choices } = useStatusChoices(id);
  const { mutate, isLoading } = useTransitionStatus(id);

  if (!choices) return null;

  const allowed = (value: string) => {
    if (role === 'ADMIN') return true;
    if (role === 'TECH' && value === 'DONE') return true;
    return false;
  };

  return (
    <Group>
      {choices.map((c) => (
        <Button
          key={c.value}
          onClick={() =>
            mutate(c.value, {
              onSuccess: () =>
                showNotification({
                  message: 'Status atualizado',
                  color: 'green',
                }),
              onError: () =>
                showNotification({
                  message: 'Transição inválida',
                  color: 'red',
                }),
            })
          }
          loading={isLoading}
          disabled={!allowed(c.value)}
        >
          {c.label}
        </Button>
      ))}
    </Group>
  );
};

export default StatusTransitionButtons;
