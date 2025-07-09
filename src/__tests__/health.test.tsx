import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';
import ClimaTrakThemeProvider from '../providers/ClimaTrakThemeProvider';
import { AuthProvider as MockAuthProvider } from '../contexts/AuthContext.mock';

test('renders without crash', () => {
  const queryClient = new QueryClient();
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MockAuthProvider>
          <ClimaTrakThemeProvider>
            <App />
          </ClimaTrakThemeProvider>
        </MockAuthProvider>
      </QueryClientProvider>
    </BrowserRouter>,
  );
  expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
});
