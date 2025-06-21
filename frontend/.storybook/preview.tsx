import type { Preview } from '@storybook/react';
import React from 'react';
import ClimaTrakThemeProvider from '../src/providers/ClimaTrakThemeProvider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ClimaTrakThemeProvider>
        <Story />
      </ClimaTrakThemeProvider>
    ),
  ],
};

export default preview;
