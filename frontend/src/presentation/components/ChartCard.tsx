import { Card, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

const ChartCard = ({ title, children }: Props) => (
  <Card padding="md" radius="md" withBorder>
    <Text mb="sm" fw={700}>
      {title}
    </Text>
    {children}
  </Card>
);

export default ChartCard;
