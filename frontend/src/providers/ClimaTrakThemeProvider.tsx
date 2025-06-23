import { ReactNode, useState, useEffect } from 'react';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  createTheme,
} from '@mantine/core';
import { colors } from '../styles/tokens';

interface Props {
  children: ReactNode;
}

const theme = createTheme({
  primaryColor: 'primary',
  colors: {
    primary: colors.primaryPalette as unknown as string[],
  },
  defaultRadius: 'xl',
  fontFamily: 'sans-serif',
});

const ClimaTrakThemeProvider = ({ children }: Props) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  useEffect(() => {
    const stored = localStorage.getItem('color-scheme');
    if (stored === 'light' || stored === 'dark') {
      setColorScheme(stored);
    }
  }, []);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme((prev) => {
      const next = value || (prev === 'dark' ? 'light' : 'dark');
      localStorage.setItem('color-scheme', next);
      return next;
    });

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={theme}
        withGlobalStyles
        withNormalizeCSS
        colorScheme={colorScheme}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default ClimaTrakThemeProvider;
