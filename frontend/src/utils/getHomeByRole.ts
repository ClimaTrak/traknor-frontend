import { Role } from '../domain/auth';

export function getHomeByRole(role: Role | null | undefined): string {
  switch (role) {
    case 'admin':
      return '/dashboard';
    case 'manager':
      return '/dashboard';
    case 'technician':
      return '/work-orders/my';
    default:
      return '/dashboard';
  }
}
