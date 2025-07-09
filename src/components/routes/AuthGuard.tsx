import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import useIsAuthenticated from '@/application/hooks/useIsAuthenticated';

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const authenticated = useIsAuthenticated();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
