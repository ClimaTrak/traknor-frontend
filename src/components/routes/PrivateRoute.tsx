import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { access } = useAuth();
  if (!access) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default PrivateRoute;
