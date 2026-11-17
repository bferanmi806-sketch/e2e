import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { StatusIcon, StatusTag } from './ui.tsx';

describe('TODO status UI', () => {
  it('renders a named TODO icon and an explanation for the status tag', () => {
    const icon = renderToStaticMarkup(createElement(StatusIcon, { status: 'todo' }));
    const tag = renderToStaticMarkup(createElement(StatusTag, { status: 'todo' }));

    expect(icon).toContain('text-status-todo');
    expect(icon).toContain('aria-label="todo"');
    expect(tag).toContain('>todo<');
    expect(tag).toContain('Not implemented yet; no attempt was run.');
  });
});
