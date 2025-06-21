import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../LoginPage';
import ClimaTrakThemeProvider from '../../../providers/ClimaTrakThemeProvider';

test('login form renders correctly', () => {
  const { container, getByLabelText } = render(
    <MemoryRouter>
      <ClimaTrakThemeProvider>
        <LoginPage />
      </ClimaTrakThemeProvider>
    </MemoryRouter>,
  );
  expect(getByLabelText('E-mail')).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
