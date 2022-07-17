export const humanConfig = {
  modelBasePath: 'https://vladmandic.github.io/human/models',
  filter: { enabled: true, equalization: false },
  face: {
    enabled: true,
    detector: { rotation: false },
    mesh: { enabled: true },
    iris: { enabled: true },
    description: { enabled: true },
    emotion: { enabled: true }
  }
};
