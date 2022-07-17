import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import Timeline from 'components/TimeLine';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import strings from 'configs/res/strings';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { SCREENS } from 'routes/ScreensName';
import { StylesDictionary } from 'utils/Utils';

export default function EkycIntroductionScreen() {
  const history = useHistory();
  return (
    <>
      <Timeline step={2} containerStyle={{ paddingTop: sizes._24sdp }} />
      <div style={styles.faceImgWrapper}>
        <img src={images.ekycFaceIntro} />
      </div>
      <div style={styles.titleWrapper}>
        <BaseText
          textContainerStyle={styles.title}
          content={strings.identityVerification.scanFace}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={styles.faceIntroWrapper}>
          <img style={styles.imgLeft} src={images.ekycFaceLeft} />
        </div>
        <div style={styles.faceIntroWrapper}>
          <img style={styles.imgMid} src={images.ekycFaceMid} />
        </div>
        <div style={styles.faceIntroWrapper}>
          <img style={styles.imgLeft} src={images.ekycFaceRight} />
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: sizes._15sdp }}>
        <div style={styles.faceIntroWrapper}>
          <BaseText
            style={{ ...styles.faceText, padding: `0px ${sizes._25sdp}px` }}
            content={strings.identityVerification.ekycFaceLef}
          />
        </div>
        <div style={styles.faceIntroWrapper}>
          <BaseText
            style={{ ...styles.faceText, padding: `0px ${sizes._20sdp}px` }}
            content={strings.identityVerification.ekycFaceMid}
          />
        </div>
        <div style={styles.faceIntroWrapper}>
          <BaseText
            style={{ ...styles.faceText, padding: `0px ${sizes._10sdp}px` }}
            content={strings.identityVerification.ekycFaceRight}
          />
        </div>
      </div>
      <div
        style={{
          padding: `${sizes._70sdp}px ${sizes._30sdp}px ${sizes._30sdp}px ${sizes._30sdp}px`
        }}
      >
        <BaseButton
          title={strings.identityVerification.verifyFace}
          onClick={() => history.push(SCREENS.EKYC_GUIDE)}
          buttonContainer={styles.buttonContainer}
          textContainerStyle={styles.textContainerStyle}
        />
      </div>
    </>
  );
}

const styles: StylesDictionary = {
  faceImgWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: sizes._30sdp
  },
  titleWrapper: {
    padding: `${sizes._40sdp}px ${sizes._65sdp}px`,
    textAlign: 'center'
  },
  title: {
    fontWeight: 600,
    fontSize: sizes._20sdp
  },
  imgLeft: {
    width: sizes._90sdp,
    height: sizes._90sdp
  },
  imgMid: {
    width: sizes._120sdp,
    height: sizes._120sdp
  },
  faceIntroWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%'
  },
  faceText: {
    fontSize: sizes._16sdp,
    color: colors.blackDefaultText
  },
  buttonContainer: {
    width: '100%',
    height: sizes._60sdp
  },
  textContainerStyle: {
    color: colors.white,
    fontWeight: '700',
    fontSize: sizes._18sdp
  }
};
