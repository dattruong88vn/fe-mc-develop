import vi from 'assets/languages/vi';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React from 'react';
import { StylesDictionary } from 'utils/Utils';

interface PendingStepProps {
  img?: string;
  txt1?: string;
  txt2?: string;
  txt3?: string;
  handleClick: () => void;
}

export default function PendingStep(props: PendingStepProps) {
  const { img, txt1, txt2, txt3, handleClick } = props;
  return (
    <div style={styles.wrapper}>
      <img src={img ?? images.signing} />
      <div style={styles.wrapperTxt}>
        <BaseText
          content={txt1 ?? vi.signContract.notSignContract}
          textContainerStyle={styles.txt1}
        />
        <BaseText
          content={txt2 ?? vi.signContract.plsSign}
          textContainerStyle={styles.txt2}
        />
        <BaseText
          content={txt3 ?? vi.signContract.signNow}
          textContainerStyle={styles.txt3}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

const styles: StylesDictionary = {
  wrapper: {
    padding: sizes._32sdp,
    width: '100%',
    bottom: 0,
    borderTop: `1px solid ${colors.blackMainWithOpacity(0.1)}`,
    borderTopLeftRadius: sizes._16sdp,
    borderTopRightRadius: sizes._16sdp,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed'
  },
  wrapperTxt: {
    width: '100%',
    height: '100%',
    marginLeft: sizes._20sdp
  },
  txt1: {
    fontSize: sizes._17sdp,
    fontWeight: 500,
    color: colors.black0A2851,
    display: 'block'
  },
  txt2: {
    fontSize: sizes._15sdp,
    color: colors.black0A2851,
    display: 'block',
    opacity: 0.7,
    marginTop: sizes._4sdp
  },
  txt3: {
    fontSize: sizes._17sdp,
    fontWeight: 600,
    color: colors.mainBlue,
    display: 'block',
    marginTop: sizes._4sdp
  }
};
