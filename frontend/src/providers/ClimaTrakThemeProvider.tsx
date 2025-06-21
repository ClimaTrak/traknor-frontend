import { ReactNode, useState } from 'react';
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
  primaryColor: 'brand',
  colors: {
    brand: Array(10).fill(colors.primary),
  },
  defaultRadius: 'xl',
  fontFamily: 'sans-serif',
});

const ClimaTrakThemeProvider = ({ children }: Props) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

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
