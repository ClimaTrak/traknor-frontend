import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import KpiCard from './KpiCard';

describe('KpiCard', () => {
  it('renders value', () => {
    const { container, getByText } = render(
      <KpiCard title="MTTR" value={10} suffix="h" icon={<span>i</span>} />,
    );
    expect(getByText('10h')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
