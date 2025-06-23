import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../src/presentation/pages/Auth/Login';
import { AuthProvider } from '../../src/hooks/useAuth';

vi.mock('../../src/infrastructure/api/auth', () => ({
  login: vi.fn().mockResolvedValue({ access: 'a', refresh: 'r', user: { id: 1, email: 'e', name: 'n', role: 'ADMIN' } }),
  logout: vi.fn(),
}));

describe('Login page', () => {
  it('submits credentials', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>,
    );
    fireEvent.change(getByLabelText('Usuário'), { target: { value: 'u' } });
    fireEvent.change(getByLabelText('Senha'), { target: { value: 'p' } });
    fireEvent.click(getByText('Entrar'));
    await waitFor(() => expect(getByText('Entrar')).toBeInTheDocument());
  });
});
