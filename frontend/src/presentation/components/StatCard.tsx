import { Card, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
  label: string;
  value: number | string;
  statusColor?: string;
  icon?: ReactNode;
}

const StatCard = ({ label, value, statusColor = 'blue', icon }: Props) => (
  <Card padding="md" radius="md" withBorder>
    <Text size="sm" c="dimmed">
      {label}
    </Text>
    <Text size="xl" fw={700} c={statusColor}>
      {value}
    </Text>
    {icon}
  </Card>
);

export default StatCard;
