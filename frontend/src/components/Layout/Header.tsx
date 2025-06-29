import {
  ActionIcon,
  Burger,
  Group,
  AppShell,
  Title,
} from '@mantine/core';
import {
  IconBell,
  IconMoonStars,
  IconSun,
  IconUser,
} from '@tabler/icons-react';

interface Props {
  opened: boolean;
  toggle: () => void;
  colorScheme: 'light' | 'dark';
  toggleColorScheme: () => void;
}

const Header = ({ opened, toggle, colorScheme, toggleColorScheme }: Props) => (
  <AppShell.Header height={64} px="md">
    <Group h="100%" justify="space-between">
      <Group>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          aria-label="Toggle navigation"
        />
        <Title order={3}>ClimaTrak</Title>
      </Group>
      <Group>
        <ActionIcon
          onClick={toggleColorScheme}
          aria-label="Toggle color scheme"
        >
          {colorScheme === 'dark' ? (
            <IconSun size={20} />
          ) : (
            <IconMoonStars size={20} />
          )}
        </ActionIcon>
        <ActionIcon aria-label="Notificações">
          <IconBell size={20} />
        </ActionIcon>
        <ActionIcon aria-label="Perfil">
          <IconUser size={20} />
        </ActionIcon>
      </Group>
    </Group>
  </AppShell.Header>
);

export default Header;
