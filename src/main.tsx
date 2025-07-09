import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import ClimaTrakThemeProvider from './providers/ClimaTrakThemeProvider';
import { AuthProvider as RealAuthProvider } from './hooks/useAuth';
import { AuthProvider as MockAuthProvider } from './contexts/AuthContext.mock';
import './index.css';

const AuthProvider = import.meta.env.DEV ? MockAuthProvider : RealAuthProvider;

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
