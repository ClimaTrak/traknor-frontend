import { useDisclosure } from '@mantine/hooks';
import { AppShell as MantineAppShell, useMantineColorScheme } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';

const AppShell = () => {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <MantineAppShell
        navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        header={{ height: 64 }}
      >
        <MantineAppShell.Header>
          <Header
            opened={opened}
            toggle={toggle}
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          />
        </MantineAppShell.Header>
        <MantineAppShell.Navbar>
          <Navbar />
        </MantineAppShell.Navbar>
        <MantineAppShell.Main>
          <Outlet />
        </MantineAppShell.Main>
      </MantineAppShell>
  );
};

export default AppShell;
