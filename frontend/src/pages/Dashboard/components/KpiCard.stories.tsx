import type { Meta, StoryObj } from '@storybook/react';
import { IconClockHour4 } from '@mantine/icons-react';
import KpiCard from './KpiCard';

const meta: Meta<typeof KpiCard> = {
  title: 'Dashboard/KpiCard',
  component: KpiCard,
};
export default meta;

export const Basic: StoryObj<typeof KpiCard> = {
  render: () => (
    <KpiCard title="MTTR" value={12} suffix="h" icon={<IconClockHour4 />} />
  ),
};
