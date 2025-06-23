import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import TopNav from '../../src/presentation/components/layout/TopNav';

describe('TopNav', () => {
  it('renders main links and avatar', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TopNav />
      </MemoryRouter>,
    );
    expect(getByText('Visão Geral')).toBeInTheDocument();
    expect(getByText('U')).toBeInTheDocument();
  });
});
