import { Divider, Group, Paper, Text } from '@mantine/core';
import { ReactNode } from 'react';
import useTokens from '@/hooks/useTokens';

interface Props {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  minHeight?: number | string;
}

const ChartCard = ({ title, children, actions, minHeight = 240 }: Props) => {
  const { spacing } = useTokens();
  return (
    <Paper
      withBorder
      shadow="sm"
      radius="xl"
      p="md"
      style={{ width: '100%', minHeight }}
    >
      <Group justify="space-between" mb="sm">
        <Text fw={700}>{title}</Text>
        {actions}
      </Group>
      <Divider mb={spacing.sm} />
      {children}
    </Paper>
  );
};

export default ChartCard;
