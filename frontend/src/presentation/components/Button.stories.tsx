import type { Meta, StoryObj } from '@storybook/react';
import type { ButtonProps } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    color: { control: 'color' },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    leftSection: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Playground: Story = {
  args: { children: 'Button', color: 'brand', size: 'md' },
  render: (args) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    return (
      <Button {...args} onClick={() => toggleColorScheme()}>
        {args.children} - {colorScheme} mode
      </Button>
    );
  },
};

