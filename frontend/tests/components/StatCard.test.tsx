import { render } from '@testing-library/react';
import StatCard from '../../src/presentation/components/StatCard';
import ClimaTrakThemeProvider from '../../src/providers/ClimaTrakThemeProvider';

it('renders value and icon', () => {
  const { getByText, getByTestId } = render(
    <ClimaTrakThemeProvider>
      <StatCard
        label="OS"
        value={5}
        statusColor="blue"
        icon={<span data-testid="icon">i</span>}
      />
    </ClimaTrakThemeProvider>,
  );
  expect(getByText('5')).toBeInTheDocument();
  expect(getByTestId('icon')).toBeInTheDocument();
});
