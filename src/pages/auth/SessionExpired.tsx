import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React from 'react';
import { StylesDictionary } from 'utils/Utils';

const SessionExpired = () => {
  return (
    <>
      <div style={styles.container}>
        <img
          src={images.expiredSessionImg}
          className="d-block center-content-horizontal"
        />
        <br />
        <BaseText
          content={'Tài khoản của bạn đã quá hạn thời gian đăng nhập.'}
          style={styles.text}
          className="text-center"
        />
      </div>
    </>
  );
};

export default SessionExpired;

const styles: StylesDictionary = {
  container: {
    paddingLeft: sizes._60sdp,
    paddingRight: sizes._60sdp,
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    textAlign: 'center'
  },
  text: {
    fontSize: sizes._16sdp,
    color: colors.textLabelColor,
    marginTop: sizes._30sdp
  }
};
