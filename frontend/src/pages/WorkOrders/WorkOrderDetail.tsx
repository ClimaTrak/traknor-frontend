import { Loader, Stack, Text } from '@mantine/core';
import { useAuth } from '@/hooks/useAuth';
import { useWorkOrder } from '@/modules/workorders/application/useWorkOrders';
import StatusTransitionButtons from './components/StatusTransitionButtons';

interface Props {
  id: number;
}

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
