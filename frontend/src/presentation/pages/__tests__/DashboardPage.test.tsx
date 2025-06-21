import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from '../DashboardPage';
import ClimaTrakThemeProvider from '../../../providers/ClimaTrakThemeProvider';
import DashboardService from '../../../services/DashboardService';

jest.mock('../../../services/DashboardService');

const mockedStats = {
  kpis: [{ label: 'OS Abertas', value: 1, statusColor: 'blue' }],
  ordersEvolution: [],
  assetStatus: [],
};

(DashboardService.getStats as jest.Mock).mockResolvedValue(mockedStats);

test('dashboard renders KPIs and charts', async () => {
  const { container, findByText } = render(
    <MemoryRouter>
      <ClimaTrakThemeProvider>
        <DashboardPage />
      </ClimaTrakThemeProvider>
    </MemoryRouter>
  );

  expect(await findByText('OS Abertas')).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
