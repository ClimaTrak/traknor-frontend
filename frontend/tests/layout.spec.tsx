import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppShell from '../src/components/Layout/AppShell';

test('burger opens navbar drawer', () => {
  const { getByLabelText, container } = render(
    <MemoryRouter>
      <AppShell />
    </MemoryRouter>,
  );
  const button = getByLabelText('Toggle navigation');
  fireEvent.click(button);
  expect(button).toHaveAttribute('data-opened', 'true');
  expect(container).toMatchSnapshot();
});
