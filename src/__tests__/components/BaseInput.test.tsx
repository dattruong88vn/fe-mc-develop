import BaseInput from 'components/BaseInput';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

let container: HTMLElement | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

it('set default value for text input', () => {
  act(() => {
    render(
      <BaseInput value="Default value" handleChange={() => undefined} />,
      container
    );
  });
  const input = container?.getElementsByTagName('input')[0];
  expect(input?.value).toBe('Default value');
});
