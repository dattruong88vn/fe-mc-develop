import vi from 'assets/languages/vi';
import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { CSSProperties, useState } from 'react';
import { StylesDictionary } from 'utils/Utils';
import ModalWrapper from './ModalWrapper';

interface ModalConfirmProps {
  handleCloseModal: () => void;
  onPressRight: (callback: () => void) => void;
  onPressLeft: (callback: () => void) => void;
  icon?: string;
  title?: string;
  content: string;
  isButtonLeft?: boolean;
  isButtonRight?: boolean;
  textButtonLeft?: string;
  textButtonRight?: string;
  modalWrapperContainer?: CSSProperties;
}

export default function ModalConfirm({
  handleCloseModal,
  icon,
  title,
  content,
  isButtonLeft,
  isButtonRight,
  textButtonLeft,
  textButtonRight,
  onPressRight,
  onPressLeft,
  modalWrapperContainer
}: ModalConfirmProps) {
  const [isSlide, setSlide] = useState(false);

  function _handleCloseModal() {
    setSlide(true);
    const timeout = setTimeout(() => {
      handleCloseModal();
      clearTimeout(timeout);
    }, 200);
  }
  const _pressRight = () => {
    onPressRight && onPressRight(_handleCloseModal);
  };
  const _pressLeft = () => {
    onPressLeft && onPressLeft(_handleCloseModal);
  };

  return (
    <ModalWrapper
      containerStyle={{ ...styles.modalWrapper, ...modalWrapperContainer }}
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
        content={title ?? vi.signContract.serviceFee}
        textContainerStyle={styles.title}
      />
      <span
        style={styles.content}
        dangerouslySetInnerHTML={{
          __html: content ?? ''
        }}
      ></span>
      <div style={styles.containerButton}>
        {isButtonLeft && (
          <BaseButton
            onClick={_pressLeft}
            buttonContainer={{
              ...styles.buttonLeft,
              backgroundColor: colors.white
            }}
            textContainerStyle={{
              ...styles.textButton,
              color: colors.bluePrimary
            }}
            title={textButtonLeft || 'Hủy bỏ'}
          />
        )}
        {isButtonRight && (
          <BaseButton
            onClick={_pressRight}
            buttonContainer={{
              ...styles.buttonLeft,
              backgroundColor: colors.bluePrimary
            }}
            textContainerStyle={{
              ...styles.textButton,
              color: colors.white
            }}
            title={textButtonRight || 'Đồng ý'}
          />
        )}
      </div>
    </ModalWrapper>
  );
}

const styles: StylesDictionary = {
  containerButton: {
    flexDirection: 'row',
    display: 'flex',
    marginTop: sizes._20sdp
  },
  textButton: {
    fontWeight: 600,
    fontSize: sizes._16sdp
  },
  buttonLeft: {
    border: 'none',
    flex: 1,
    borderRadius: sizes._21sdp
  },
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
    fontSize: sizes._19sdp,
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
