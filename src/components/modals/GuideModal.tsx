import vi from 'assets/languages/vi';
import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { useState } from 'react';
import { StylesDictionary } from 'utils/Utils';
import ModalWrapper from './ModalWrapper';
import { v4 as uuidv4 } from 'uuid';
interface GuideModalProps {
  handleCloseModal: () => void;
}

const takePhotoGuides = [
  vi.identityVerification.takePhotoGuide1,
  vi.identityVerification.takePhotoGuide2,
  vi.identityVerification.takePhotoGuide3
];

export default function GuideModal(props: GuideModalProps) {
  const { handleCloseModal } = props;

  const [isSlide, setSlide] = useState(false);

  function _handleCloseModal() {
    setSlide(true);
    const timeout = setTimeout(() => {
      handleCloseModal();
      clearTimeout(timeout);
    }, 300);
  }

  return (
    <ModalWrapper containerStyle={styles.containerStyle} isSlide={isSlide}>
      <div style={styles.titleWrapper}>
        <BaseText
          content={vi.identityVerification.takePhotoGuide}
          textContainerStyle={styles.title}
        />
      </div>
      <div style={styles.contentWrapper}>
        {takePhotoGuides.map((guide, index) => (
          <div key={uuidv4()} style={styles.warning}>
            <div style={styles.dot} />
            <BaseText
              content={guide}
              textContainerStyle={styles.takePhotoGuide}
            />
          </div>
        ))}
        <div style={{...styles.takePhoto, flexDirection: 'row', alignItems: 'center'}}>
          <img src={images.idcard1}  />
          <img src={images.idcard2} style={{marginInline: sizes._29sdp}}  />
          <img src={images.idcard3}  />
        </div>

        <img src={images.prohibited} style={styles.takePhoto} />
      </div>

      <BaseButton
        title={vi.identityVerification.understand}
        onClick={() => _handleCloseModal()}
        buttonContainer={styles.buttonContainer}
        textContainerStyle={styles.textContainerStyle}
      />
    </ModalWrapper>
  );
}

const styles: StylesDictionary = {
  containerStyle: {
    background: colors.white,
    height: window.innerHeight / 1.2,
    borderTopLeftRadius: sizes._24sdp,
    borderTopRightRadius: sizes._24sdp
  },
  titleWrapper: {
    width: '100%',
    padding: `${sizes._38sdp}px ${sizes._17sdp}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: sizes._20sdp,
    fontWeight: 700,
    color: colors.black0A2851
  },
  warning: {
    width: '100%',
    padding: `0 ${sizes._43sdp}px`,
    display: 'flex',
    alignItems: 'center',
    marginBottom: sizes._10sdp
  },
  dot: {
    width: sizes._6sdp,
    height: sizes._6sdp,
    borderRadius: sizes._6sdp,
    background: colors.black0A2851,
    marginRight: sizes._11sdp
  },
  takePhotoGuide: {
    fontSize: sizes._15sdp,
    width: sizes._280sdp
  },
  takePhoto: {
    display: 'block',
    margin: 'auto',
    width: '85%',
    marginTop: sizes._30sdp
  },
  buttonContainer: {
    width: '85%',
    margin: 'auto',
    marginTop: sizes._24sdp
  },
  textContainerStyle: {
    color: colors.white
  },
  contentWrapper: {
    width: '100%',
    height: sizes._380sdp,
    overflow: 'scroll'
  }
};
