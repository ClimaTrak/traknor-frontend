import { Grid, Skeleton } from '@mantine/core';
import {
  IconClockBolt,
  IconClockHour4,
  IconListCheck,
  IconListSearch,
} from '@tabler/icons-react';
import KpiCard from './components/KpiCard';
import useDashboardSummary from './components/useDashboardSummary';

const DashboardView = () => {
  const { data, isFetching } = useDashboardSummary();

  if (!data) {
    return <Skeleton h={120} />;
  }

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <KpiCard
          title="MTTR"
          value={data.mttr_hours}
          suffix="h"
          icon={<IconClockHour4 />}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <KpiCard
          title="MTBF"
          value={data.mtbf_hours}
          suffix="h"
          icon={<IconClockBolt />}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <KpiCard
          title="OS Abertas"
          value={data.open_os}
          icon={<IconListSearch />}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <KpiCard
          title="OS Fechadas"
          value={data.closed_os}
          icon={<IconListCheck />}
        />
      </Grid.Col>
      {isFetching && <Skeleton h={2} mt="sm" />}
    </Grid>
  );
};

export default DashboardView;
