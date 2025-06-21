import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mantine/core';
import ChartCard from './ChartCard';

const meta: Meta<typeof ChartCard> = {
  title: 'Components/ChartCard',
  component: ChartCard,
  argTypes: {
    title: { control: 'text' },
    minHeight: { control: 'number' },
    showActions: { control: 'boolean' },
  },
};

export default meta;

interface Args {
  title: string;
  minHeight?: number;
  showActions?: boolean;
}
type Story = StoryObj<Args>;

export const Playground: Story = {
  args: {
    title: 'Exemplo de Gráfico',
    minHeight: 240,
    showActions: false,
  },
  render: ({ title, minHeight, showActions }) => (
    <ChartCard
      title={title}
      minHeight={minHeight}
      actions={showActions ? <Button size="xs">Exportar</Button> : undefined}
    >
      <div
        style={{
          height: 240,
          background: '#eee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Gráfico aqui
      </div>
    </ChartCard>
  ),
};
