import { NavLink } from 'react-router-dom';
import { AppShell, Stack } from '@mantine/core';
import {
  IconHome2,
  IconDeviceDesktopAnalytics,
  IconClipboardList,
  IconFileText,
  IconListCheck,
  IconUsers,
  IconReportAnalytics,
  IconGauge,
} from '@tabler/icons-react';

const menu = [
  { label: 'Visão Geral', icon: IconGauge, to: '/' },
  { label: 'Ativos', icon: IconDeviceDesktopAnalytics, to: '/ativos' },
  { label: 'Ordens de Serviço', icon: IconClipboardList, to: '/ordens' },
  { label: 'Solicitações', icon: IconFileText, to: '/solicitacoes' },
  { label: 'Planos', icon: IconListCheck, to: '/planos' },
  { label: 'Métricas', icon: IconHome2, to: '/metricas' },
  { label: 'Usuários', icon: IconUsers, to: '/usuarios' },
  { label: 'Relatórios', icon: IconReportAnalytics, to: '/reports' },
];

export const Navbar = () => (
  <AppShell.Navbar w={{ base: 200 }} p="md">
    <AppShell.Section grow component={Stack} gap="xs">
      {menu.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            color: isActive ? '#00fff4' : 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          })}
        >
          <item.icon size={16} />
          {item.label}
        </NavLink>
      ))}
    </AppShell.Section>
  </AppShell.Navbar>
);

export default Navbar;
