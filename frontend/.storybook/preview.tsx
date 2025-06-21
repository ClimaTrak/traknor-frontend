import type { Preview } from '@storybook/react';
import React from 'react';
import ClimaTrakThemeProvider from '../src/providers/ClimaTrakThemeProvider';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#000000' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ClimaTrakThemeProvider>
        <Story />
      </ClimaTrakThemeProvider>
    ),
  ],
};

export default preview;
