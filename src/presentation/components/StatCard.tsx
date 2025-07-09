import { Card, Group, Stack, Text } from '@mantine/core';
import { ReactNode } from 'react';
import useTokens from '@/hooks/useTokens';

interface Props {
  icon?: ReactNode;
  label: string;
  value: string | number;
  statusColor: string;
}

const StatCard = ({ icon, label, value, statusColor }: Props) => {
  const { typography } = useTokens();

  return (
    <Card withBorder shadow="sm" radius="xl" p="lg">
      <Group align="center">
        {icon && <div>{icon}</div>}
        <Stack gap={0}>
          <Text c="dimmed" style={{ fontSize: typography.caption14 }}>
            {label}
          </Text>
          <Text
            fw={700}
            style={{ fontSize: typography.heading48, color: statusColor }}
          >
            {value}
          </Text>
        </Stack>
      </Group>
    </Card>
  );
};

export default StatCard;
