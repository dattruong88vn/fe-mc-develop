import TimeLine from 'components/TimeLine';
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

it('not show checked first icon when step 1 active', () => {
  act(() => {
    render(<TimeLine step={1} />, container);
  });
  const img = container?.getElementsByTagName('img')[0];
  expect(img?.style.display).toBe('none');
});

it('show checked first icon when step 2 and 3 active', () => {
  act(() => {
    render(<TimeLine step={2} />, container);
  });
  const img = container?.getElementsByTagName('img')[0];
  expect(img?.style.display).toBe('block');
});
