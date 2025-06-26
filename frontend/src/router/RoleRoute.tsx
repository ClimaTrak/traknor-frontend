import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/modules/users/schemas/userSchema';

const RoleRoute: FC<{ allowedRoles: UserRole[] }> = ({ allowedRoles }) => {
  const { role } = useAuth();
  if (!role) return <Navigate to="/login" replace />;
  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/403" replace />
  );
};

export default RoleRoute;
