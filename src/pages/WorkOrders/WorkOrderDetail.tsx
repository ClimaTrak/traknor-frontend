import { Loader, Stack, Text } from '@mantine/core';
import { useAuth } from '@/hooks/useAuth';
import { useWorkOrder } from '@/modules/workorders/application/useWorkOrders';
import StatusTransitionButtons from './components/StatusTransitionButtons';

/** Exibe os detalhes de uma ordem de serviço selecionada. */

/** Propriedades do componente de detalhes da OS. */
interface Props {
  /** Identificador da ordem a ser exibida */
  id: number;
}

/**
 * Apresenta informações da OS e botões de transição de status.
 */
const WorkOrderDetail = ({ id }: Props) => {
  const { data, isLoading } = useWorkOrder(id);
  const { role } = useAuth();
  if (isLoading) return <Loader />;
  if (!data) return <Text>Nenhuma OS encontrada</Text>;
  return (
    <Stack>
      <Text fz="lg" fw={700}>
        {data.titulo}
      </Text>
      <Text>Equipamento: {data.equipamento}</Text>
      <Text>Prioridade: {data.prioridade}</Text>
      <Text>Status: {data.status}</Text>
      <StatusTransitionButtons id={id} role={role} />
    </Stack>
  );
};

export default WorkOrderDetail;
