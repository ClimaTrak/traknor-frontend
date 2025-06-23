import { afterAll, afterEach, beforeAll, vi, it, expect } from 'vitest';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import DashboardView from '../src/pages/Dashboard/DashboardView';

const handlers = [
  rest.get('/api/dashboard/summary/', (_req, res, ctx) =>
    res(ctx.json({ mttr_hours: 1, mtbf_hours: 2, open_os: 3, closed_os: 4 })),
  ),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('refreshes automatically', async () => {
  let value = 1;
  server.use(
    rest.get('/api/dashboard/summary/', (_req, res, ctx) => {
      value += 1;
      return res(
        ctx.json({ mttr_hours: value, mtbf_hours: value, open_os: value, closed_os: value }),
      );
    }),
  );

  vi.useFakeTimers();
  const qc = new QueryClient();
  const { getByText } = render(
    <QueryClientProvider client={qc}>
      <DashboardView />
    </QueryClientProvider>,
  );

  await waitFor(() => getByText('1h'));
  vi.advanceTimersByTime(60_000);
  await waitFor(() => getByText('2h'));
  vi.useRealTimers();
});
