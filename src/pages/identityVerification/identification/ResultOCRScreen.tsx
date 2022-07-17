import { Image } from 'antd';
import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import React, { CSSProperties } from 'react';
import { useHistory } from 'react-router-dom';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import strings from 'configs/res/strings';
import { SCREENS } from 'routes/ScreensName';

function ResultOCRScreen() {
  const history = useHistory();

  const onCancel = () => {
    history.replace(SCREENS.IDENTIFICATION);
  };
  const onTakeCaptureAgain = () => {
    history.replace(SCREENS.IDENTIFICATION);
  };
  return (
    <div>
      <div style={container}>
        <Image src={images.ic_fail_cmt} preview={false} style={imageStyle} />
        <BaseText
          content={strings.identityVerification.errorTitleOCR}
          textContainerStyle={title}
        />
        <BaseText
          content={strings.identityVerification.contentOCR}
          textContainerStyle={{ ...content, ...padding }}
        />

        <div style={wrapperText}>
          <BaseText
            content={strings.identityVerification.titleCall}
            textContainerStyle={content}
          />
          <BaseText
            content={strings.identityVerification.hotline}
            textContainerStyle={phoneStyle}
          />
        </div>
        <div style={wrapperButton}>
          <BaseButton
            title={strings.authReportError.quit}
            textContainerStyle={{
              ...textButton,
              color: colors.black0A2851
            }}
            buttonContainer={{ ...buttonContainer, ...buttonLeft }}
            onClick={onCancel}
          />
          <BaseButton
            title={strings.identityVerification.captureAgain}
            buttonContainer={buttonContainer}
            textContainerStyle={textButton}
            onClick={onTakeCaptureAgain}
          />
        </div>
      </div>
    </div>
  );
}

const container: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: sizes._80sdp
};
const imageStyle: CSSProperties = {
  width: sizes._120sdp,
  height: sizes._100sdp
};
const title: CSSProperties = {
  color: colors.black0A2851,
  fontSize: sizes._20sdp,
  fontWeight: '600',
  paddingTop: sizes._50sdp
};
const content: CSSProperties = {
  color: colors.grey6C7E98,
  fontSize: sizes._16sdp,
  fontWeight: '400',
  paddingTop: sizes._7sdp,
  textAlign: 'center'
};
const padding: CSSProperties = {
  paddingLeft: sizes._30sdp,
  paddingRight: sizes._30sdp
};

const wrapperText: CSSProperties = {
  textAlign: 'center',
  paddingTop: sizes._170sdp
};

const phoneStyle: CSSProperties = {
  color: colors.bluePrimary,
  fontSize: sizes._17sdp,
  fontWeight: '400',
  paddingTop: sizes._7sdp
};
const wrapperButton: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginTop: sizes._10sdp
};

const buttonContainer: CSSProperties = {
  width: sizes._220sdp,
  height: sizes._50sdp,
  marginTop: sizes._15sdp
};

const buttonLeft: CSSProperties = {
  width: sizes._140sdp,
  backgroundColor: colors.grayD6D9E0,
  marginRight: sizes._20sdp
};
const textButton: CSSProperties = {
  color: colors.white,
  fontSize: sizes._18sdp,
  fontWeight: '600'
};

export default ResultOCRScreen;
