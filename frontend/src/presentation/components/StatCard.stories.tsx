import type { Meta, StoryObj } from '@storybook/react';
import StatCard from './StatCard';
import { Button } from '@mantine/core';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
};

export default meta;

type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  render: () => (
    <StatCard
      label="OS Abertas"
      value={8}
      statusColor="green"
      icon={
        <span role="img" aria-label="up">
          📈
        </span>
      }
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <StatCard
      label="OS Atrasadas"
      value={2}
      statusColor="orange"
      icon={
        <span role="img" aria-label="warning">
          ⚠️
        </span>
      }
    />
  ),
};
