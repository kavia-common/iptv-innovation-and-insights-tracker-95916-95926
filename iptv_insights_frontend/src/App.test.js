import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Login heading', () => {
  render(<App />);
  const text = screen.getByText(/Sign in to continue/i);
  expect(text).toBeInTheDocument();
});
