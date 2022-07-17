import images from 'configs/res/images';
import strings from 'configs/res/strings';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SCREENS } from 'routes/ScreensName';
import Lottie from 'react-lottie';
import BaseText from 'components/BaseText';
import sizes from 'configs/res/sizes';
import colors from 'configs/res/colors';
import { StylesDictionary } from 'utils/Utils';

export default function RegisterSucessScreen() {
  const history = useHistory();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: images.icPaymentSuccess,
    renderer: 'svg'
  };

  useEffect(() => {
    setTimeout(() => {
      history.replace(SCREENS.EKYC_INTRODUCTION);
    }, 5000);
  }, []);

  return (
    <div style={{ paddingTop: 170 }}>
      <Lottie options={defaultOptions} height={155} width={155} />
      <BaseText
        content={strings.authen.registerSuccess}
        textContainerStyle={styles.sentSuccessTxt}
      />
    </div>
  );
}

const styles: StylesDictionary = {
  sentSuccessTxt: {
    display: 'block',
    fontSize: sizes._24sdp,
    fontWeight: 600,
    color: colors.black0A2851,
    textAlign: 'center',
    padding: `0px ${sizes._66sdp}px`
  }
};
