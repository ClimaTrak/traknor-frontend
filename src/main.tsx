import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import ClimaTrakThemeProvider from './providers/ClimaTrakThemeProvider';
import { AuthProvider } from './hooks/useAuth';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ClimaTrakThemeProvider>
          <App />
        </ClimaTrakThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
