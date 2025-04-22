import { render, screen } from '@testing-library/react';
import { classNamesModule } from '@utils/classNamesModule';
import { describe, expect, test } from 'vitest';
import Typography from './Typography';
import styles from './Typography.module.css';

describe('Typography', () => {
  test('should render with default props', () => {
    render(<Typography>Default text</Typography>);

    const el = screen.getByText('Default text');

    expect(el).toBeInTheDocument();
    expect(el.tagName.toLowerCase()).toBe('p');
    expect(el).toHaveClass(
      styles.typography,
      styles.body1,
      styles['align-left'],
      styles['weight-normal']
    );
  });

  test('should render correct heading variant', () => {
    render(<Typography variant="h2">Heading</Typography>);
    const el = screen.getByText('Heading');
    expect(el.tagName.toLowerCase()).toBe('h2');
    expect(el).toHaveClass(styles.h2);
  });

  test('should apply custom color', () => {
    render(<Typography color="red">Colored text</Typography>);
    const text = screen.getByText('Colored text');
    expect(text).toHaveStyle('color: rgb(255, 0, 0)');
  });

  test('should use "as" prop to override element', () => {
    render(<Typography as="span">Span text</Typography>);
    const el = screen.getByText('Span text');
    expect(el.tagName.toLowerCase()).toBe('span');
  });

  test('should apply noWrap and gutterBottom classes', () => {
    render(
      <Typography noWrap gutterBottom>
        Special classes
      </Typography>
    );
    const el = screen.getByText('Special classes');
    expect(el).toHaveClass(styles.noWrap);
    expect(el).toHaveClass(styles.gutterBottom);
  });

  test('should apply custom className', () => {
    const typographyClasses = classNamesModule(styles, 'my-custom-class');

    render(<Typography className="my-custom-class">Custom class</Typography>);
    const el = screen.getByText('Custom class');
    expect(el).toHaveClass(typographyClasses);
  });

  test('should apply custom weight and alignment', () => {
    render(
      <Typography align="right" weight="bold">
        Styled text
      </Typography>
    );
    const el = screen.getByText('Styled text');
    expect(el).toHaveClass(styles['align-right']);
    expect(el).toHaveClass(styles['weight-bold']);
  });
});
