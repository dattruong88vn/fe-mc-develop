import sizes from 'configs/res/sizes';
import React, { HTMLAttributes } from 'react';
import { StylesDictionary } from 'utils/Utils';
import BaseText from './BaseText';

interface Props extends HTMLAttributes<any> {
  title: string;
  content: string | number;
  icon: string;
  isLine?: boolean;
}

export default function BaseTextLine(props: Props) {
  const { title, content, icon, isLine } = props;
  return (
    <>
      <div style={styles.wraper}>
        <img style={styles.img} src={icon} />
        <div style={styles.textWrapper}>
          <BaseText
            style={{ fontSize: sizes._18sdp, fontWeight: 400 }}
            content={title}
          />
          <BaseText
            style={{ fontSize: sizes._17sdp, color: '#0A2851', opacity: 0.5 }}
            content={content}
          />
        </div>
      </div>
      {isLine ? <div style={styles.line}></div> : null}
    </>
  );
}

const styles: StylesDictionary = {
  wraper: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: sizes._15sdp
  },
  img: {
    width: sizes._20sdp,
    height: sizes._20sdp
  },
  textWrapper: {
    display: 'grid',
    paddingLeft: sizes._16sdp
  },
  line: {
    height: '1px',
    background: '#0A2851',
    opacity: 0.05,
    marginTop: sizes._16sdp
  }
};
