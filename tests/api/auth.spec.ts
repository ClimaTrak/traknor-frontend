import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { api } from '../../frontend/src/infrastructure/api/axios';
import { login } from '../../frontend/src/infrastructure/api/auth';
import { tokenStore } from '../../frontend/src/utils/tokenStorage';

const server = setupServer(
  rest.post('http://localhost:8000/api/auth/login/', (_req, res, ctx) =>
    res(ctx.json({ access: 'a1', refresh: 'r1' })),
  ),
  rest.post('http://localhost:8000/api/auth/refresh/', (_req, res, ctx) =>
    res(ctx.json({ access: 'a2', refresh: 'r2' })),
  ),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  tokenStore.clear();
});
afterAll(() => server.close());

describe('auth api', () => {
  it('login stores tokens', async () => {
    await login({ username: 'u', password: 'p' });
    expect(tokenStore.access).toBe('a1');
    expect(tokenStore.refresh).toBe('r1');
  });

  it('refresh interceptor replays request', async () => {
    tokenStore.set('old', 'r1');
    let calls = 0;
    server.use(
      rest.get('http://localhost:8000/test', (_req, res, ctx) => {
        calls += 1;
        if (calls === 1) return res(ctx.status(401));
        return res(ctx.json({ ok: true }));
      }),
    );
    await api.get('/test');
    expect(calls).toBe(2);
    expect(tokenStore.access).toBe('a2');
  });
});
