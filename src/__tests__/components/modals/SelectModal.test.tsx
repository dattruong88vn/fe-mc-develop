import vi from 'assets/languages/vi';
import SelectModal from 'components/modals/SelectModal';
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

it('show exact province when open popup', () => {
  act(() => {
    render(
      <SelectModal isShowSelectModal={1} handleCloseModal={() => undefined} />,
      container
    );
  });
  const input = container?.getElementsByTagName('input')[0];
  expect(input?.placeholder).toBe(
    `${vi.identityVerification.inputName} ${vi.identityVerification.province}`
  );
});

it('show exact ward when open popup', () => {
  act(() => {
    render(
      <SelectModal isShowSelectModal={3} handleCloseModal={() => undefined} />,
      container
    );
  });
  const input = container?.getElementsByTagName('input')[0];
  expect(input?.placeholder).toBe(
    `${vi.identityVerification.inputName} ${vi.identityVerification.ward}`
  );
});
