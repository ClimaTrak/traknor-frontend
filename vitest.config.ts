import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'c8',
      all: true,
      lines: 80,
      branches: 80,
      functions: 80,
      statements: 80,
      reporter: ['text', 'lcov'],
    },
  },
});
