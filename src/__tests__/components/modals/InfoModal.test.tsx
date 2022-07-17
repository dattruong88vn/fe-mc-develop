import InfoModal from 'components/modals/InfoModal';
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

it('Check confirm or notice modal', () => {
  act(() => {
    render(
      <InfoModal isConfirm={true} handleCloseModal={() => undefined} />,
      container
    );
  });
  const img = container?.getElementsByTagName('img')[0];
  const btn = container?.getElementsByTagName('button')[0];
  expect(img?.style.display).toBe('none');
  expect(btn?.style.display).toBe('block');
});
