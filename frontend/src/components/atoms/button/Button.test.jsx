import { describe, expect, test } from 'vitest';
import Button from './Button';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
  test('should render with default props', () => {
    render(<Button>Default text</Button>);

    const button = screen.getByText('Default text');
    expect(button).toBeInTheDocument();
  });
});
