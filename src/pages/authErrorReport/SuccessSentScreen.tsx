import vi from 'assets/languages/vi';
import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React from 'react';
import { StylesDictionary } from 'utils/Utils';

export default function SuccessSentScreen() {
  return (
    <>
      <img src={images.sentSuccess} style={styles.imgSuccess} />
      <BaseText
        content={vi.authReportError.sentSuccess}
        textContainerStyle={styles.sentSuccessTxt}
      />
      <BaseText
        content={vi.authReportError.plsWait}
        textContainerStyle={styles.plsWaitTxt}
      />
      <div style={styles.btnWrapper}>
        <BaseButton
          onClick={() => {
            // props.history.go(-3);
            // setTimeout(() => {
            //   props.history.replace(SCREENS.FACEAUTH)
            // }, 0);
          }}
          title={vi.authReportError.quit}
          buttonContainer={{ width: '100%' }}
          textContainerStyle={{ color: colors.white }}
        />
      </div>
    </>
  );
}

const styles: StylesDictionary = {
  imgSuccess: {
    display: 'block',
    margin: 'auto',
    marginTop: sizes._58sdp
  },
  sentSuccessTxt: {
    display: 'block',
    fontSize: sizes._24sdp,
    fontWeight: 600,
    color: colors.black0A2851,
    textAlign: 'center'
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
