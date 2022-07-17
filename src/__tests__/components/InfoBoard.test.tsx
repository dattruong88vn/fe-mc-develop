import InfoBoard from 'components/InfoBoard';
import images from 'configs/res/images';
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

it('renders with a icon', () => {
  act(() => {
    render(
      <InfoBoard
        title="Default title"
        icon={images.bigSigning}
        content=""
        learnMore={() => undefined}
      />,
      container
    );
  });
  const input = container?.getElementsByTagName('img')[1];
  expect(typeof input?.getAttribute('src')).toBe('string');
});
