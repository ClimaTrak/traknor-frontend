import { useEffect, useState } from 'react';
import { SimpleGrid, Skeleton, Stack, Title } from '@mantine/core';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import DashboardService, { DashboardStats } from '../../services/DashboardService';

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    DashboardService.getStats().then(setStats);
  }, []);

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
    </Stack>
  );
};

export default DashboardPage;
