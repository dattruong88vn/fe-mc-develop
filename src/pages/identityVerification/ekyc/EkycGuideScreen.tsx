import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import strings from 'configs/res/strings';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { SCREENS } from 'routes/ScreensName';
import { StylesDictionary } from 'utils/Utils';
import DotComponent from './components/DotComponent';

export default function EkycGuideScreen() {
  const history = useHistory();
  return (
    <>
      <div style={styles.imgWrapper}>
        <img style={styles.img} src={images.ekycGuide} />
      </div>
      <div style={styles.title}>
        <BaseText
          textContainerStyle={styles.titleText}
          content={strings.identityVerification.scanGuide}
        />
      </div>
      <div style={styles.stepWrapper}>
        <div style={{ display: 'inline-grid' }}>
          <img src={images.ekycStep1} />
          <DotComponent />
          <img src={images.ekycStep2} />
          <DotComponent />
          <img src={images.ekycStep3} />
        </div>
        <div style={styles.stepText}>
          <p
            style={{
              ...styles.text,
              position: 'relative',
              top: -5
            }}
          >
            {strings.identityVerification.ekycStep1}
          </p>
          <p style={{ ...styles.text, position: 'relative', top: 7 }}>
            {strings.identityVerification.ekycStep2}
          </p>
          <p style={{ ...styles.text, position: 'relative', top: 20 }}>
            {strings.identityVerification.ekycStep3}
          </p>
        </div>
      </div>
      <div
        style={{
          padding: `${sizes._70sdp}px ${sizes._30sdp}px ${sizes._30sdp}px ${sizes._30sdp}px`
        }}
      >
        <BaseButton
          title={strings.identityVerification.verifyFace}
          onClick={() => history.push(SCREENS.EKYC_SCREEN)}
          buttonContainer={styles.buttonContainer}
          textContainerStyle={styles.textContainerStyle}
        />
      </div>
    </>
  );
}

const styles: StylesDictionary = {
  imgWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  img: {
    width: sizes._240sdp,
    height: sizes._240sdp,
    paddingTop: sizes._30sdp
  },
  title: {
    margin: `${sizes._55sdp}px 0px ${sizes._25sdp}px 0px`,
    textAlign: 'center'
  },
  titleText: {
    fontWeight: 600,
    fontSize: sizes._20sdp
  },
  buttonContainer: {
    width: '100%',
    height: sizes._60sdp
  },
  textContainerStyle: {
    color: colors.white,
    fontWeight: '700',
    fontSize: sizes._18sdp
  },
  stepWrapper: {
    display: ' inline-flex',
    padding: `${sizes._20sdp}px ${sizes._40sdp}px`
    // position: 'relative'
  },
  stepText: {
    position: 'relative',
    paddingLeft: sizes._25sdp,
    top: 0
  },
  text: {
    fontFamily: 'SF UI Display Medium',
    fontSize: 14,
    color: colors.blackDefaultText
  }
};
