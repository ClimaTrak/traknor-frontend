import { describe, it, expect } from 'vitest';
import { getHomeByRole } from '../getHomeByRole';

describe('getHomeByRole', () => {
  it('returns dashboard for admin', () => {
    expect(getHomeByRole('admin')).toBe('/dashboard');
  });

  it('returns dashboard for manager', () => {
    expect(getHomeByRole('manager')).toBe('/dashboard');
  });

  it('returns work-orders path for technician', () => {
    expect(getHomeByRole('technician')).toBe('/work-orders/my');
  });

  it('returns dashboard for unknown role', () => {
    expect(getHomeByRole(null)).toBe('/dashboard');
  });
});
