import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '@testing-library/react';
import ProtectedRoute from '../ProtectedRoute';
import { useAuthStore } from '../../../application/stores/useAuthStore';

describe('ProtectedRoute', () => {
  it('redirects to login when unauthenticated', () => {
    useAuthStore.setState({ token: null });
    const { container } = render(
      <MemoryRouter initialEntries={['/app']}>
        <Routes>
          <Route path="/login" element={<div>Login</div>} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <div>App</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(container.innerHTML).toContain('Login');
  });

  it('renders children when authenticated', () => {
    useAuthStore.setState({ token: 'token' });
    const { getByText } = render(
      <MemoryRouter initialEntries={['/app']}>
        <Routes>
          <Route path="/login" element={<div>Login</div>} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <div>App</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(getByText('App')).toBeInTheDocument();
  });
});
