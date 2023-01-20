import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './app';

test('renders app', () => {
  render(<App />);
  const text = screen.getByText(/App/i);
  expect(text).toBeInTheDocument();
});
