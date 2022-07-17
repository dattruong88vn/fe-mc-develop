import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { CSSProperties } from 'react';
import { StylesDictionary } from 'utils/Utils';

interface WarningMessageProps {
  content: string;
  styleWrapper?: CSSProperties;
}

export default function WarningMessage(props: WarningMessageProps) {
  const { content, styleWrapper } = props;
  return (
    <div style={styles.wrapper}>
      <div style={{ ...styles.content, ...styleWrapper }}>
        <img src={images.warningGrey} />
        <BaseText content={content} textContainerStyle={styles.contentText} />
      </div>
    </div>
  );
}

const styles: StylesDictionary = {
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    width: '95%',
    background: colors.redFF5561,
    borderRadius: sizes._6sdp,
    position: 'fixed',
    top: 0,
    display: 'flex',
    padding: `${sizes._20sdp}px ${sizes._14sdp}px`,
    alignItems: 'center'
  },
  contentText: {
    fontSize: sizes._16sdp,
    color: colors.white,
    display: 'block',
    marginLeft: sizes._14sdp
  }
};
