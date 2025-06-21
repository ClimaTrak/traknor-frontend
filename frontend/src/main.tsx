import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ClimaTrakThemeProvider from './providers/ClimaTrakThemeProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ClimaTrakThemeProvider>
      <App />
    </ClimaTrakThemeProvider>
  </React.StrictMode>,
);
