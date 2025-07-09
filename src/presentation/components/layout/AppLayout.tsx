import { ReactNode } from 'react';
import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';

// Estrutura base da aplicação com cabeçalho

interface Props {
  children?: ReactNode;
}

const AppLayout = ({ children }: Props) => (
  <AppShell header={{ height: 64 }} padding="md">
    <AppShell.Header>
      <TopNav />
    </AppShell.Header>
    <AppShell.Main>{children || <Outlet />}</AppShell.Main>
  </AppShell>
);

export default AppLayout;
