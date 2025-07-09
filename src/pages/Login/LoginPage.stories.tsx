import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/Login',
  component: LoginPage,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
};
export default meta;

type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {};

export const WithError: Story = {
  args: { initialError: 'Credenciais inválidas' },
};
