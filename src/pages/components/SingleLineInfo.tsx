import vi from 'assets/languages/vi';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React from 'react';

interface Info {
  title: string;
  data: string;
  isRequire?: boolean;
  tips?: boolean;
}

interface SingleLineInfoProps {
  infos: Info[];
  info: Info;
  index: number;
  openEmailModal?: () => void;
  isValidate?: boolean;
  showTips?: () => void;
}

export default function SingleLineInfo(props: SingleLineInfoProps) {
  const { infos, info, index, openEmailModal, isValidate, showTips } = props;
  return (
    <>
      <div style={styles.wrapper}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BaseText content={info.title} textContainerStyle={styles.title} />
          {info.tips && (
            <img
              style={styles.tips}
              src={images.FeeInfo}
              onClick={() => showTips && showTips()}
            />
          )}
        </div>

        <BaseText
          content={info.data}
          textContainerStyle={{
            ...styles.data,
            color: info.isRequire ? colors.blue0A73F0 : colors.black0A2851
          }}
          handleClick={() => {
            openEmailModal && info.isRequire && openEmailModal();
          }}
        />
      </div>
      {info.isRequire ? (
        <BaseText
          content={
            isValidate && info.data === '+ Thêm email'
              ? vi.identityVerification.emailBlank
              : vi.identityVerification.require
          }
          textContainerStyle={
            isValidate && info.data === '+ Thêm email'
              ? styles.emailBlank
              : styles.require
          }
        />
      ) : null}
      {index === infos.length - 1 ? null : <div style={styles.br} />}
    </>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: sizes._16sdp,
    color: colors.black0A2851
  },
  data: {
    fontSize: sizes._16sdp,
    color: colors.black0A2851,
    fontWeight: 600,
    maxWidth: sizes._200sdp
  },
  br: {
    width: '100%',
    height: 1,
    margin: `${sizes._16sdp}px 0`,
    background: colors.black0A2851,
    opacity: 0.1
  },
  require: {
    fontSize: sizes._13sdp,
    color: colors.black0A2851,
    opacity: 0.4
  },
  emailBlank: {
    fontSize: sizes._13sdp,
    color: colors.redFF0000
  },
  tips: {
    marginLeft: sizes._10sdp
  }
};
