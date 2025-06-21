import { render } from '@testing-library/react';
import StatCard from './StatCard';
import ClimaTrakThemeProvider from '../../providers/ClimaTrakThemeProvider';

test('stat card renders correctly', () => {
  const { container, getByText } = render(
    <ClimaTrakThemeProvider>
      <StatCard label="OS" value={1} statusColor="blue" />
    </ClimaTrakThemeProvider>,
  );

  expect(getByText('OS')).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
