import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import LoginPage from './LoginPage';
import { AuthProvider } from '@/hooks/useAuth';
import { MantineProvider } from '@mantine/core';

const server = setupServer(
  http.post('*/api/auth/login/', async ({ request }) => {
    const { password } = await request.json();
    if (password === 'pass1234') {
      return HttpResponse.json({
        access: 'a',
        refresh: 'r',
        user: { id: 1, email: 'e', name: 'n', role: 'admin' },
      });
    }
    return HttpResponse.text('Invalid', { status: 400 });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const navigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useNavigate: () => navigate };
});

const renderPage = () =>
  render(
    <AuthProvider>
      <MantineProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </MantineProvider>
    </AuthProvider>,
  );

test('successful login redirects', async () => {
  renderPage();
  await userEvent.type(screen.getByLabelText(/email/i), 't@e.com');
  await userEvent.type(screen.getByLabelText(/senha/i), 'pass1234');
  await userEvent.click(screen.getByRole('button', { name: /acessar/i }));
  await waitFor(() => expect(navigate).toHaveBeenCalledWith('/dashboard'));
});

test('invalid credentials show error', async () => {
  server.use(
    http.post('*/api/auth/login/', () =>
      HttpResponse.text('Invalid', { status: 401 }),
    ),
  );
  renderPage();
  await userEvent.type(screen.getByLabelText(/email/i), 't@e.com');
  await userEvent.type(screen.getByLabelText(/senha/i), 'wrongpass');
  await userEvent.click(screen.getByRole('button', { name: /acessar/i }));
  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
});
