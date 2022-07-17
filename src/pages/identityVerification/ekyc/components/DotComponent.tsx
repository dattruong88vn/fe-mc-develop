import sizes from 'configs/res/sizes';
import React from 'react';
import { StylesDictionary } from 'utils/Utils';

export default function DotComponent() {
  return (
    <>
      <div style={{ ...styles.dot, marginTop: sizes._4sdp }}></div>
      <div style={styles.dot}></div>
      <div style={styles.dot}></div>
      <div style={styles.dot}></div>
      <div style={styles.dot}></div>
      <div style={styles.dot}></div>
      <div style={styles.dot}></div>
      <div style={{ ...styles.dot, marginBottom: sizes._4sdp }}></div>
    </>
  );
}

const styles: StylesDictionary = {
  dot: {
    border: `${sizes._1sdp}px solid #D8D8D8`,
    width: 2,
    height: 2,
    borderRadius: '50%',
    backgroundColor: '#D8D8D8',
    marginBottom: 2,
    justifySelf: 'center'
  }
};
