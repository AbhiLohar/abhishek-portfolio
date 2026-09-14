import { render, screen } from '@testing-library/react';
import App from './App';

test('renders AB-OS BIOS screen', () => {
  render(<App />);
  const biosElement = screen.getByText(/AB-OS BIOS/i);
  expect(biosElement).toBeInTheDocument();
});
