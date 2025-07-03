import { Box, Group, Stack, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
  icon?: ReactNode;
  title: string;
  description: string;
  actions?: ReactNode;
}

const EmptyState = ({ icon, title, description, actions }: Props) => (
  <Box maw={400} mx="auto" my="xl">
    <Stack align="center" gap="sm">
      {icon}
      <Text fw={700}>{title}</Text>
      <Text c="dimmed" ta="center">
        {description}
      </Text>
      {actions && <Group mt="md">{actions}</Group>}
    </Stack>
  </Box>
);

export default EmptyState;
