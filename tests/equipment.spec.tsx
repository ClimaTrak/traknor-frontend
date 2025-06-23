import { afterAll, afterEach, beforeAll, expect, it } from 'vitest';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import EquipmentTable from '../frontend/src/pages/Equipment/EquipmentTable';

const equipments = [
  { id: 1, nome: 'Compressor', categoria: 'HVAC', fabricante: 'ACME', numeroSerie: '123', status: 'ativo' },
];

const server = setupServer(
  rest.get('http://localhost:8000/api/equipment/', (_req, res, ctx) => res(ctx.json(equipments))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('renders equipment table', async () => {
  const queryClient = new QueryClient();
  const { findByText } = render(
    <QueryClientProvider client={queryClient}>
      <EquipmentTable />
    </QueryClientProvider>,
  );
  expect(await findByText('Compressor')).toBeDefined();
});
