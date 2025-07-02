import { Button, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  useStatusChoices,
  useTransitionStatus,
} from '@/modules/workorders/application/useWorkOrders';

/**
 * Botões responsáveis por executar as transições de status da OS.
 */

/** Propriedades do componente de transição de status */
interface Props {
  /** Identificador da OS */
  id: number;
  /** Papel do usuário atual */
  role: string | null;
}

const StatusTransitionButtons = ({ id, role }: Props) => {
  const { data: choices } = useStatusChoices(id);
  const { mutate, isLoading } = useTransitionStatus(id);

  if (!choices) return null;

  /**
   * Verifica se o usuário atual pode executar a transição informada.
   */
  const allowed = (value: string) => {
    if (role === 'admin') return true;
    if (role === 'technician' && value === 'DONE') return true;
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
