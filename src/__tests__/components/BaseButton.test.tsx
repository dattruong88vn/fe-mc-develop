import BaseButton from 'components/BaseButton';
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

it('renders with a button name', () => {
  act(() => {
    render(
      <BaseButton title="Default button name" onClick={() => undefined} />,
      container
    );
  });
  expect(container?.textContent).toBe('Default button name');
});
