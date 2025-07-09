import React from 'react';
import { MantineProvider } from '@mantine/core';
import '../src/index.css';

export const decorators = [
  (Story: any) => (
    <MantineProvider>
      <Story />
    </MantineProvider>
  ),
];
