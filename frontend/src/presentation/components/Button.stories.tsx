import type { Meta, StoryObj } from '@storybook/react';
import { useMantineColorScheme, Button } from '@mantine/core';

const meta: Meta = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    return (
      <div>
        <Button onClick={() => toggleColorScheme()}>{colorScheme} mode</Button>
      </div>
    );
  },
};
