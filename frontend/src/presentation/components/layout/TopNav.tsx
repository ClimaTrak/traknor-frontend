import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Header,
  Group,
  Burger,
  Drawer,
  Stack,
  ActionIcon,
  Badge,
  Avatar,
  Menu,
  Button,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useAuthStore } from '../../../stores/useAuthStore';

const baseLinks = [
  { label: 'Visão Geral', to: '/app/overview', roles: ['admin', 'manager', 'technician'] },
  { label: 'Equipamentos', to: '/app/equipamentos', roles: ['admin', 'manager', 'technician'] },
  { label: 'Usuários', to: '/app/usuarios', roles: ['admin'] },
  { label: 'Ordens de Serviço', to: '/app/work-orders', roles: ['admin', 'technician'] },
  { label: 'Planos', to: '/app/plans', roles: ['admin'] },
  { label: 'Métricas', to: '/app/metrics', roles: ['admin'] },
  { label: 'Relatórios', to: '/app/reports', roles: ['admin', 'manager'] },
];

const TopNav = () => {
  const theme = useMantineTheme();
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const [module, setModule] = useState('TrakNor');
  const role = useAuthStore((s) => s.user?.role ?? 'technician');
  const links = baseLinks.filter((l) => l.roles.includes(role));

  const items = links.map((link) => (
    <Button
      key={link.to}
      component={NavLink}
      to={link.to}
      variant="subtle"
      color="gray"
      onClick={() => isMobile && close()}
      className={({ isActive }) =>
        `${isActive ? 'text-[#00968f]' : 'text-gray-200'} hover:opacity-80`
      }
    >
      {link.label}
    </Button>
  ));

  return (
    <Header height={64} className="bg-[#002d2b] text-gray-200">
      <Group justify="space-between" h="100%" px="md">
        <Group gap="sm">
          {isMobile && (
            <Burger
              opened={opened}
              onClick={toggle}
              aria-label="Toggle navigation"
              color="white"
            />
          )}
          <span className="font-bold">ClimaTrak</span>
          <Menu withinPortal>
            <Menu.Target>
              <Button variant="subtle" color="gray">
                {module}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => setModule('TrakNor')}>
                TrakNor
              </Menu.Item>
              <Menu.Item onClick={() => setModule('TrakSense')}>
                TrakSense
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        {!isMobile && <Group gap="sm">{items}</Group>}
        <Group gap="sm">
          <ActionIcon variant="subtle" color="gray">
            <Badge color="red" variant="filled" size="xs">
              3
            </Badge>
          </ActionIcon>
          <Avatar radius="xl" size="sm" color="cyan">
            U
          </Avatar>
        </Group>
      </Group>
      <Drawer opened={opened} onClose={close} padding="md" size="xs">
        <Stack>{items}</Stack>
      </Drawer>
    </Header>
  );
};

export default TopNav;
