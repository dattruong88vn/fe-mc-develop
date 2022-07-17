import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import ModalWrapper from 'components/modals/ModalWrapper';
import colors from 'configs/res/colors';
import sizes from 'configs/res/sizes';
import strings from 'configs/res/strings';
import React, { useState } from 'react';
import { StylesDictionary } from 'utils/Utils';

interface EkycModalProps {
  handleBlueButton: () => void;
  handleWhiteButton: () => void;
  imgUrl: string;
}

export default function EkycReview(props: EkycModalProps) {
  const { handleBlueButton, handleWhiteButton, imgUrl } = props;

  const [isSlide, setSlide] = useState(false);

  return (
    <ModalWrapper
      containerStyle={{
        background: colors.white,
        height: window.innerHeight / 1.2,
        borderTopLeftRadius: sizes._24sdp,
        borderTopRightRadius: sizes._24sdp
      }}
      isSlide={isSlide}
    >
      <div>
        <div style={styles.content}>
          <div style={{ marginTop: sizes._37sdp, marginBottom: sizes._37sdp }}>
            <BaseText
              content={strings.identityVerification.ekycReviewTitle}
              textContainerStyle={styles.title}
            />
          </div>
          <img
            src={imgUrl}
            width={sizes._250sdp}
            height={sizes._320sdp}
            style={{ objectFit: 'cover' }}
          />
          <div style={{ ...styles.btnWrapper }}>
            <BaseButton
              title={strings.identityVerification.useCapture}
              onClick={handleBlueButton}
              buttonContainer={styles.btnConfirm}
              textContainerStyle={styles.cancelText}
            />
            <BaseButton
              title={strings.identityVerification.tryAgain}
              buttonContainer={styles.btnExit}
              textContainerStyle={styles.saveAndExit}
              onClick={handleWhiteButton}
            />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

const styles: StylesDictionary = {
  content: {
    width: '100%',
    padding: `0 ${sizes._30sdp}px`,
    textAlign: 'center'
  },
  title: {
    fontWeight: 600,
    fontSize: sizes._20sdp
  },
  btnWrapper: {
    marginTop: sizes._37sdp
  },
  btnConfirm: {
    marginTop: sizes._16sdp,
    marginRight: sizes._18sdp,
    height: sizes._40sdp,
    width: '100%',
    border: '1px solid #E7E9F2',
    boxSizing: 'border-box',
    borderRadius: sizes._8sdp,
    backgroundColor: '#3383F9'
  },
  cancelText: {
    fontSize: sizes._16sdp,
    fontWeight: 400,
    color: 'white'
  },
  saveAndExit: {
    fontSize: sizes._16sdp,
    fontWeight: 400,
    color: '#3383F9'
  },
  btnExit: {
    marginTop: sizes._16sdp,
    marginRight: sizes._18sdp,
    height: sizes._40sdp,
    width: '100%',
    border: '1px solid #3383F9',
    boxSizing: 'border-box',
    borderRadius: sizes._8sdp,
    backgroundColor: 'white'
  }
};
