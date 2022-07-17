const eventTypes = [
  'keypress',
  'mousemove',
  'mousedown',
  'scroll',
  'touchmove',
  'pointermove'
];
export const addEventListeners = (listener: any) => {
  eventTypes.forEach((type) => {
    window.addEventListener(type, listener, false);
    document.addEventListener(type, listener, false);
  });
};
export const removeEventListeners = (listener: any) => {
  if (listener) {
    eventTypes.forEach((type) => {
      window.removeEventListener(type, listener, false);
      document.removeEventListener(type, listener, false);
    });
  }
};
