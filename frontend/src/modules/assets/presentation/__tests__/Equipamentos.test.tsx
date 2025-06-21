import { render, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EquipamentosPage from '../EquipamentosPage';
import ClimaTrakThemeProvider from '../../../../providers/ClimaTrakThemeProvider';

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ClimaTrakThemeProvider>{children}</ClimaTrakThemeProvider>
  </QueryClientProvider>
);

test('renders list and can open form', async () => {
  const { getByText } = render(<EquipamentosPage />, { wrapper: Wrapper });
  expect(getByText('Equipamentos')).toBeInTheDocument();
  fireEvent.click(getByText('Novo'));
  expect(getByText('Salvar')).toBeInTheDocument();
});
