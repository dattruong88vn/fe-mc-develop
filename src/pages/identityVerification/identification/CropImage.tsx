import React, { CSSProperties } from 'react';
import sizes from 'configs/res/sizes';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import BaseButton from 'components/BaseButton';
import colors from 'configs/res/colors';
import strings from 'configs/res/strings';

interface Props {
  srcImg: string;
  onChangeCapture: (c: object) => void;
  onLoadCapture: (c: object) => void;
  onCancel: () => void;
  onExportCapure: () => void;
  crop: object;
}

function CropImage(props: Props) {
  const {
    srcImg,
    crop,
    onChangeCapture,
    onLoadCapture,
    onCancel,
    onExportCapure
  } = props;

  const onChange = (c: object) => {
    if (c) onChangeCapture(c);
  };
  const onLoad = (c: object) => {
    if (c) onLoadCapture(c);
  };
  return (
    <div style={{ marginTop: sizes._15sdp }}>
      <ReactCrop
        src={srcImg}
        onChange={onChange}
        crop={crop}
        maxWidth={sizes._360sdp}
        maxHeight={sizes._230sdp}
        onImageLoaded={onLoad}
      />

      <div style={wrapperButton}>
        <BaseButton
          title={strings.identityVerification.cancel}
          buttonContainer={{ ...buttonContainer, ...buttonLeft }}
          onClick={onCancel}
        />
        <BaseButton
          title={strings.identityVerification.choose}
          textContainerStyle={textButton}
          buttonContainer={buttonContainer}
          onClick={onExportCapure}
        />
      </div>
    </div>
  );
}

const wrapperButton: CSSProperties = {
  display: 'flex',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  marginLeft: sizes._27sdp
};

const buttonContainer: CSSProperties = {
  width: sizes._150sdp,
  height: sizes._40sdp,
  marginLeft: sizes._20sdp
};

const buttonLeft: CSSProperties = {
  backgroundColor: colors.grayD6D9E0
};
const textButton: CSSProperties = {
  color: colors.white
};

export default CropImage;
