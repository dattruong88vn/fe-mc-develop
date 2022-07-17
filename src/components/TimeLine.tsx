import vi from 'assets/languages/vi';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { CSSProperties, Fragment, useEffect, useState } from 'react';
import { StylesDictionary } from 'utils/Utils';
import BaseText from './BaseText';
import { v4 as uuidv4 } from 'uuid';
export interface TimelineProps {
  step: number;
  containerStyle?: CSSProperties;
}

const steps = [
  {
    step: 1,
    title: vi.authen.register,
    firstStepImg: images.iconRegisterCurrent,
    currentStepImg: images.iconRegisterCurrent,
    stepDoneImg: images.iconStepDone
  },
  {
    step: 2,
    title: vi.authen.auth,
    firstStepImg: images.iconAuthenFirst,
    currentStepImg: images.iconAuthenCurrent,
    stepDoneImg: images.iconStepDone
  },
  {
    step: 3,
    title: vi.signContract.signContract,
    firstStepImg: images.iconSignFirst,
    currentStepImg: images.iconSignCurrent,
    stepDoneImg: images.iconStepDone
  }
];

export default function Timeline(props: TimelineProps) {
  const { step, containerStyle } = props;

  return (
    <div
      style={{ ...containerStyle, width: '100%', padding: `0 ${sizes._24sdp}` }}
    >
      <div id="dot" style={styles.dotFrame}>
        {steps.map((_step, index) => (
          <Fragment key={uuidv4()}>
            <div
              style={{
                ...styles.dotWrapper
              }}
            >
              <img
                src={
                  _step.step === step
                    ? _step.currentStepImg
                    : _step.step < step
                    ? _step.stepDoneImg
                    : _step.firstStepImg
                }
                style={{
                  width: sizes._32sdp,
                  height: sizes._32sdp
                }}
              />
            </div>
            <div
              style={{
                ...styles.line,
                display: index === steps.length - 1 ? 'none' : 'block',
                background:
                  _step.step < step ? colors.blue0A73F0 : colors.greyDot
              }}
            />
          </Fragment>
        ))}
      </div>
      <div style={styles.textFrame}>
        {steps.map((_step, index) => (
          <BaseText
            key={uuidv4()}
            content={_step.title}
            textContainerStyle={{
              color:
                _step.step === step
                  ? colors.black0A2851
                  : _step.step < step
                  ? colors.blue0A73F0
                  : '#8493A8',
              fontSize: sizes._13sdp,
              width: sizes._80sdp,
              marginLeft:
                _step.title && _step.title === vi.authen.register
                  ? sizes._16sdp
                  : _step.title && _step.title === vi.authen.auth
                  ? sizes._16sdp
                  : 0
            }}
          />
        ))}
      </div>
    </div>
  );
}

const styles: StylesDictionary = {
  dotFrame: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: sizes._54sdp,
    paddingRight: sizes._54sdp,
    marginBottom: sizes._10sdp
  },
  textFrame: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `0 ${sizes._24sdp}px`
  },
  dotWrapper: {
    width: sizes._24sdp,
    height: sizes._24sdp,
    borderRadius: sizes._12sdp,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    width: sizes._16sdp,
    height: sizes._16sdp,
    borderRadius: sizes._8sdp,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    width: window.innerWidth / 5,
    height: 2,
    background: colors.greyDot
  },
  textTips: {
    width: 'calc(100%)', // 56px padding 2 bên 28px
    padding: sizes._10sdp,
    background: colors.black0A2851,
    borderRadius: sizes._4sdp,
    marginTop: sizes._10sdp,
    zIndex: 1,
    position: 'absolute'
  },
  triangle: {
    width: 0,
    height: 0,
    border: `solid ${sizes._8sdp}px`,
    borderColor: `${colors.transparent} ${colors.transparent} ${colors.black0A2851} ${colors.transparent}`,
    top: -sizes._16sdp,
    position: 'absolute'
  }
};
