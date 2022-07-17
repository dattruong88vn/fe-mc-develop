import vi from 'assets/languages/vi';
import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import sizes from 'configs/res/sizes';
import React, { HTMLAttributes } from 'react';
import { StylesDictionary } from 'utils/Utils';

interface Props extends HTMLAttributes<any> {
  img?: string;
  title: string;
  content?: string | number;
  // textContainerStyle?: CSSProperties;
  handleClick?: any;
  isBtn?: boolean;
}

export default function BaseResult(props: Props) {
  const { img, title, content, handleClick, isBtn } = props;

  return (
    <>
      {img ? (
        <img src={img} style={styles.imgSuccess} />
      ) : (
        <div style={styles.imgSuccess}></div>
      )}

      <BaseText content={title} textContainerStyle={styles.sentSuccessTxt} />
      <BaseText
        content={content ?? ''}
        textContainerStyle={styles.plsWaitTxt}
      />
      {isBtn ? (
        <div style={styles.btnWrapper}>
          <BaseButton
            onClick={handleClick}
            title={vi.authReportError.quit}
            buttonContainer={{ width: '100%', height: sizes._60sdp }}
            textContainerStyle={{ color: colors.white, fontSize: sizes._18sdp }}
          />
        </div>
      ) : null}
    </>
  );
}

const styles: StylesDictionary = {
  imgSuccess: {
    display: 'block',
    margin: 'auto',
    paddingTop: sizes._150sdp,
    paddingBottom: sizes._40sdp
  },
  sentSuccessTxt: {
    display: 'block',
    fontSize: sizes._24sdp,
    fontWeight: 600,
    color: colors.black0A2851,
    textAlign: 'center',
    padding: `0px ${sizes._66sdp}px`
  },
  plsWaitTxt: {
    display: 'block',
    fontSize: sizes._20sdp,
    color: colors.black0A2851,
    textAlign: 'center'
  },
  btnWrapper: {
    width: '100%',
    bottom: 0,
    padding: `0 ${sizes._24sdp}px ${sizes._48sdp}px ${sizes._24sdp}px`,
    position: 'fixed'
  }
};
