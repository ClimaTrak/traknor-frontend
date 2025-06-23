import { Role } from '../domain/auth';

export function getHomeByRole(role: Role | null | undefined): string {
  switch (role) {
    case 'ADMIN':
      return '/dashboard';
    case 'TECH':
      return '/work-orders';
    case 'CLIENT':
      return '/work-orders/my';
    default:
      return '/dashboard';
  }
}
