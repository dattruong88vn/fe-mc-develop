import strings from 'assets/languages/vi';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { CSSProperties, useState } from 'react';
import { StylesDictionary } from 'utils/Utils';
import ModalWrapper from './ModalWrapper';

export interface InfoModalProps {
  handleButton1: () => void;
  handleButton2?: () => void;
  icon?: string;
  title?: string;
  content?: string;
  btnContent?: string;
  btnSecondContent?: string;
  isConfirm?: boolean;
  isConfirmSecond?: boolean;
  btnStyle?: CSSProperties;
  btnSecondStyle?: CSSProperties;
  isHideClose?: boolean;
}

export default function InfoModal(props: InfoModalProps) {
  const {
    handleButton1,
    handleButton2,
    icon,
    title,
    content,
    btnContent,
    btnSecondContent,
    isConfirm,
    isConfirmSecond,
    btnStyle,
    btnSecondStyle,
    isHideClose
  } = props;
  const [isSlide, setSlide] = useState(false);

  function _handleButton1() {
    setSlide(true);
    const timeout = setTimeout(() => {
      handleButton1();
      clearTimeout(timeout);
    }, 200);
  }

  function _handleButton2() {
    setSlide(true);
    const timeout = setTimeout(() => {
      if (handleButton2) handleButton2();
      clearTimeout(timeout);
    }, 200);
  }

  return (
    <ModalWrapper
      containerStyle={styles.modalWrapper}
      isSlide={isSlide}
      bottom={`calc(50% - ${sizes._96sdp}px)`}
    >
      {icon ? (
        <div style={styles.iconWrapper}>
          <img
            src={icon}
            style={{ width: sizes._50sdp, height: sizes._50sdp }}
          />
        </div>
      ) : null}
      <BaseText
        content={title ?? strings.signContract.serviceFee}
        textContainerStyle={styles.title}
      />
      {isHideClose ? null : (
        <img
          src={images.close}
          style={{
            ...styles.close,
            display: isConfirm ? 'none' : 'block'
          }}
          onClick={() => _handleButton1()}
        />
      )}

      <BaseText
        content={content ?? ''}
        textContainerStyle={{ ...styles.content, whiteSpace: 'pre-line' }}
      />
      {isConfirm && (
        <button
          type="button"
          onClick={() => _handleButton1()}
          style={btnStyle ?? styles.btnStyle}
        >
          {btnContent ?? strings.signContract.ok}
        </button>
      )}
      {isConfirmSecond && (
        <button
          type="button"
          onClick={() => _handleButton2()}
          style={btnSecondStyle}
        >
          {btnSecondContent}
        </button>
      )}
    </ModalWrapper>
  );
}

const styles: StylesDictionary = {
  modalWrapper: {
    background: colors.white,
    width: '90%',
    // height: sizes._192sdp,
    padding: sizes._20sdp,
    margin: 'auto',
    borderRadius: sizes._16sdp,
    overflow: 'hidden',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  iconWrapper: {
    textAlign: 'center',
    marginBottom: sizes._10sdp
  },
  title: {
    display: 'block',
    fontSize: sizes._18sdp,
    fontWeight: 600,
    color: colors.black0A2851,
    textAlign: 'center'
  },
  close: {
    top: sizes._20sdp,
    right: sizes._20sdp,
    width: sizes._24sdp,
    position: 'absolute'
  },
  content: {
    display: 'block',
    marginTop: sizes._10sdp,
    fontSize: sizes._15sdp,
    color: colors.black0A2851,
    textAlign: 'center'
  },
  btnStyle: {
    margin: 'auto',
    marginTop: sizes._20sdp,
    borderRadius: sizes._21sdp,
    border: 'none',
    padding: `${sizes._10sdp}px ${sizes._36sdp}px`,
    background: colors.mainBlue,
    color: colors.white,
    fontSize: sizes._16sdp,
    fontWeight: 600,
    display: 'block'
  }
};
