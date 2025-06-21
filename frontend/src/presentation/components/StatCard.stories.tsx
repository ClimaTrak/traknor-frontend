import type { Meta, StoryObj } from '@storybook/react';
import StatCard from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'number' },
    statusColor: { control: 'color' },
    icon: { control: 'text' },
  },
};

export default meta;

interface Args {
  label: string;
  value: number;
  statusColor: string;
  icon?: string;
}
type Story = StoryObj<Args>;

export const Playground: Story = {
  args: {
    label: 'OS Abertas',
    value: 8,
    statusColor: 'green',
    icon: '📈',
  },
  render: ({ label, value, statusColor, icon }) => (
    <StatCard
      label={label}
      value={value}
      statusColor={statusColor}
      icon={
        icon ? (
          <span role="img" aria-label="icon">
            {icon}
          </span>
        ) : undefined
      }
    />
  ),
};
