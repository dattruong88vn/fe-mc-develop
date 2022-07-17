import vi from 'assets/languages/vi';
import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import strings from 'configs/res/strings';
import React from 'react';
import { StylesDictionary } from 'utils/Utils';

export default function EContractFailScreen() {
  return (
    <>
      <img src={images.EcontractFail} style={styles.imgSuccess} />
      <BaseText
        content={strings.identityVerification.cancelMessage}
        textContainerStyle={styles.sentSuccessTxt}
      />
      <BaseText
        content={strings.signContract.econtractFail}
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
          title={strings.identityVerification.confirm}
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
    marginTop: sizes._20sdp,
    display: 'block',
    fontSize: sizes._24sdp,
    fontWeight: 600,
    color: colors.black0A2851,
    textAlign: 'center'
  },
  plsWaitTxt: {
    display: 'block',
    fontSize: sizes._17sdp,
    color: colors.black0A2851,
    textAlign: 'center',
    padding: sizes._20sdp,
    opacity: 0.7
  },
  btnWrapper: {
    width: '100%',
    bottom: 0,
    padding: `0 ${sizes._24sdp}px ${sizes._48sdp}px ${sizes._24sdp}px`,
    position: 'fixed'
  }
};
