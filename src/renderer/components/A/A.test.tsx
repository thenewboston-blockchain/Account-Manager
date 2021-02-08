import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import A from './index';

describe('A component', () => {
  test('renders with text passed in', () => {
    render(
      <A className="test" href="/">
        Hello World
      </A>,
    );

    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  test('expect to have proper href passed in', () => {
    const link = 'https://thenewboston.com';
    render(<A href={link}>hello</A>);

    expect(screen.getByText('hello')).toHaveAttribute('href', link);
  });

  test('renders proper default className', () => {
    render(<A href="/">hello</A>);

    expect(screen.getByText('hello').className).toBe('A');
  });

  test('renders with classNames passed in', () => {
    render(
      <A className="test" href="/">
        hello
      </A>,
    );

    expect(screen.getByText('hello').className).toContain('test');
  });
});
