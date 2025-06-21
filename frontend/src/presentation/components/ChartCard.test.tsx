import { render } from '@testing-library/react';
import ChartCard from './ChartCard';
import ClimaTrakThemeProvider from '../../providers/ClimaTrakThemeProvider';

test('chart card renders correctly', () => {
  const { container, getByText } = render(
    <ClimaTrakThemeProvider>
      <ChartCard title="Chart">
        <div>Content</div>
      </ChartCard>
    </ClimaTrakThemeProvider>,
  );

  expect(getByText('Chart')).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
