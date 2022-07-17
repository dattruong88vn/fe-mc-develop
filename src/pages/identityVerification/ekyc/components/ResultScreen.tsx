import React, { CSSProperties } from 'react';
import { StylesDictionary } from 'utils/Utils';
import colors from 'configs/res/colors';
import sizes from 'configs/res/sizes';
import BaseText from 'components/BaseText';
import BaseButton from 'components/BaseButton';

interface Result {
  img: string;
  titile: string;
  content?: string;
  handleBlueButton: () => void;
  handleWhiteButton: () => void;
  isSecondBtn?: boolean;
  btn1Text: string;
  btn2Text?: string;
  btnWrapperStyles?: CSSProperties;
}

export default function ResultScreen(props: Result) {
  const {
    img,
    titile,
    content,
    handleBlueButton,
    handleWhiteButton,
    isSecondBtn,
    btn1Text,
    btn2Text,
    btnWrapperStyles
  } = props;
  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.img}>
          <img src={img} />
        </div>
        <div style={styles.contentWrapper}>
          <BaseText content={titile} textContainerStyle={styles.titleId} />
          {content ? (
            <>
              <div style={styles.br}></div>
              <BaseText
                content={content ?? ''}
                textContainerStyle={styles.content}
              />{' '}
            </>
          ) : null}
        </div>
        <div style={styles.btnWrapper}>
          <BaseButton
            title={btn1Text}
            onClick={handleBlueButton}
            buttonContainer={styles.btnConfirm}
            textContainerStyle={styles.cancelText}
          />
          {isSecondBtn ? (
            <BaseButton
              title={btn2Text ?? ''}
              buttonContainer={styles.btnExit}
              textContainerStyle={styles.saveAndExit}
              onClick={handleWhiteButton}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

const styles: StylesDictionary = {
  wrapper: {
    width: '100%',
    background: colors.white,
    padding: `0px ${sizes._18sdp}px`,
    textAlign: 'center'
  },
  img: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: sizes._77sdp,
    marginBottom: sizes._50sdp
  },
  contentWrapper: {
    padding: `0px ${sizes._60sdp}px`,
    width: '100%'
  },
  titleId: {
    fontWeight: 700,
    fontSize: sizes._30sdp,
    color: '#0B192D'
  },
  br: {
    marginTop: sizes._25sdp
  },
  content: {
    fontWeight: 400,
    fontSize: sizes._16sdp,
    color: '##4E5B6C'
  },
  btnWrapper: {
    position: 'fixed',
    bottom: sizes._55sdp,
    width: '90%',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  btnConfirm: {
    height: sizes._60sdp,
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
    height: sizes._60sdp,
    width: '100%',
    border: '1px solid #3383F9',
    boxSizing: 'border-box',
    borderRadius: sizes._8sdp,
    backgroundColor: 'white'
  }
};
