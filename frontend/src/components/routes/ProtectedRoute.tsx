import { ReactNode } from 'react';
import AuthGuard from './AuthGuard';

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => (
  <AuthGuard>{children}</AuthGuard>
);

export default ProtectedRoute;
