import { Card, Group, Stack, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
  title: string;
  value: number | string;
  icon: ReactNode;
  suffix?: string;
}

const KpiCard = ({ title, value, icon, suffix }: Props) => (
  <Card withBorder radius="xl" p="md">
    <Group justify="space-between">
      <Stack gap={0}>
        <Text c="#002d2b" size="sm">
          {title}
        </Text>
        <Text fw={700} size="xl">
          {value}
          {suffix}
        </Text>
      </Stack>
      <div style={{ color: '#00968f' }}>{icon}</div>
    </Group>
  </Card>
);

export default KpiCard;
