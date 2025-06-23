import { describe, it, beforeEach, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../frontend/src/hooks/useAuth';
import RoleRoute from '../frontend/src/router/RoleRoute';
import EquipmentTable from '../frontend/src/pages/Equipment/EquipmentTable';

beforeEach(() => {
  localStorage.clear();
});

describe('Role based routing', () => {
  it('redirects unauthorized user to /403', () => {
    localStorage.setItem('tk_role', 'manager');
    render(
      <MemoryRouter initialEntries={['/usuarios']}>
        <AuthProvider>
          <Routes>
            <Route element={<RoleRoute allowedRoles={['admin']} />}>
              <Route path="/usuarios" element={<div>Usuarios</div>} />
            </Route>
            <Route path="/403" element={<div>403</div>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText('403')).toBeInTheDocument();
  });

  it('shows delete button for admin', () => {
    localStorage.setItem('tk_role', 'admin');
    render(
      <AuthProvider>
        <EquipmentTable />
      </AuthProvider>,
    );
    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();
  });
});
