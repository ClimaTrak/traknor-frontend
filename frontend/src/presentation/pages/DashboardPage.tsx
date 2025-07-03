import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useGetApiEquipment } from '@/api/generated/hooks/equipment';
import EmptyState from '../components/EmptyState';
import strings from '../../i18n';

// Página principal com indicadores do sistema
import { SimpleGrid, Skeleton, Stack, Title } from '@mantine/core';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import DashboardService, {
  DashboardStats,
} from '../../services/DashboardService';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data: equipments, isLoading: eqLoading } = useGetApiEquipment({
    page: 1,
    page_size: 1,
  });
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    // Busca os dados do dashboard ao montar o componente
    DashboardService.getStats().then(setStats);
  }, []);

  if (eqLoading || !equipments) {
    return (
      <Stack p="lg">
        <Title order={1}>Dashboard</Title>
        <Skeleton h={120} />
      </Stack>
    );
  }

  if (equipments.length === 0) {
    return (
      <Stack p="lg">
        <Title order={1}>Dashboard</Title>
        <EmptyState
          title={strings.dashboard.empty.title}
          description={strings.dashboard.empty.description}
          actions={
            <>
              <Button onClick={() => navigate('import-csv')}>
                {strings.dashboard.empty.importCsv}
              </Button>
              <Button variant="outline" onClick={() => navigate('new')}>
                {strings.dashboard.empty.addEquipment}
              </Button>
            </>
          }
        />
        <Outlet />
      </Stack>
    );
  }

  // Enquanto os dados não chegam exibimos um loading
  if (!stats) {
    return (
      <Stack p="lg">
        <Title order={1}>Dashboard</Title>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="md">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} h={80} radius="md" />
          ))}
        </SimpleGrid>
        <Skeleton h={300} radius="md" mt="md" />
        <Skeleton h={300} radius="md" mt="md" />
      </Stack>
    );
  }

  // Com os dados prontos exibimos o dashboard
  return (
    <Stack p="lg">
      <Title order={1}>Dashboard</Title>
      <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="md">
        {stats.kpis.map((kpi) => (
          <StatCard key={kpi.label} {...kpi} />
        ))}
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" mt="md">
        <ChartCard title="Evolução das OS">
          <div style={{ height: 240 }}>Gráfico Linha</div>
        </ChartCard>
        <ChartCard title="Status dos ativos">
          <div style={{ height: 240 }}>Gráfico Pizza</div>
        </ChartCard>
      </SimpleGrid>
      <Outlet />
    </Stack>
  );
};

export default DashboardPage;
