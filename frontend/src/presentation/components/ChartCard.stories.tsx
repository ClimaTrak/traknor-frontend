import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mantine/core';
import ChartCard from './ChartCard';

const meta: Meta<typeof ChartCard> = {
  title: 'Components/ChartCard',
  component: ChartCard,
};

export default meta;

type Story = StoryObj<typeof ChartCard>;

export const Default: Story = {
  render: () => (
    <ChartCard title="Exemplo de Gráfico">
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

export const WithActions: Story = {
  render: () => (
    <ChartCard title="Com Ações" actions={<Button size="xs">Exportar</Button>}>
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
