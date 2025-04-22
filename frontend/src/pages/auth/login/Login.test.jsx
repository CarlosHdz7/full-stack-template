import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Login from './Login';

test('renders Home text', () => {
	render(<Login />);
	expect(screen.getByText('Login')).toBeInTheDocument();
});
