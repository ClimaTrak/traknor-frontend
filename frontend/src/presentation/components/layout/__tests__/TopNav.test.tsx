import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TopNav from '../TopNav';

test('renders navigation links', () => {
  const { container, getByText } = render(
    <MemoryRouter>
      <TopNav />
    </MemoryRouter>,
  );
  expect(getByText('Visão Geral')).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
