import sizes from 'configs/res/sizes';
import React from 'react';

// eslint-disable-next-line react/display-name
const FaceFrameView = React.memo(() => (
  <svg height={sizes._500sdp} width={sizes._414sdp}>
    <defs>
      <mask id="mask">
        <rect height={sizes._500sdp} width={sizes._414sdp} fill="#fff" />
        <ellipse rx={'30%'} ry={'32%'} cx={'50%'} cy={'50%'} />
      </mask>
    </defs>
    <rect
      height={sizes._500sdp}
      width={sizes._414sdp}
      mask="url(#mask)"
      fill="rgba(0,0,0,0.7)"
    />
  </svg>
));

export default FaceFrameView;
