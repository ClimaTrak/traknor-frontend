import { render } from '@testing-library/react';
import Button from './Button';
import ClimaTrakThemeProvider from '../../providers/ClimaTrakThemeProvider';

test('button renders correctly', () => {
  const { container } = render(
    <ClimaTrakThemeProvider>
      <Button>Test</Button>
    </ClimaTrakThemeProvider>,
  );
  expect(container).toMatchSnapshot();
});
