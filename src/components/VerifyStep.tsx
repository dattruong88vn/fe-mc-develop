import BaseText from 'components/BaseText';
import InfoBoard from 'components/InfoBoard';
import { hideLoading, showLoading } from 'components/spinnerLoading';
import Timeline from 'components/TimeLine';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SCREENS } from 'routes/ScreensName';
import { getDataWithEmptyString, StylesDictionary } from 'utils/Utils';

interface VerifyStepProps {
  history: RouteComponentProps['history'];
  icon?: string;
  title?: string;
  content?: string;
  nextScreen?: string;
  step: number;
}

export default function VerifyStep(props: VerifyStepProps) {
  useEffect(() => {
    showLoading();
    setTimeout(() => {
      props.history.replace(getDataWithEmptyString(props.nextScreen));
      hideLoading();
    }, 5000);
  }, []);

  return (
    <>
      <Timeline
        step={props.step}
        containerStyle={{ paddingTop: sizes._24sdp }}
      />
      <img
        src={images.default_avatar}
        style={{ display: 'block', margin: 'auto', marginTop: sizes._30sdp }}
      />
      <BaseText content="Vũ Trung Hiếu" textContainerStyle={styles.fullName} />
      <BaseText content="0987654321" textContainerStyle={styles.phone} />
      <InfoBoard
        title={getDataWithEmptyString(props.title)}
        icon={getDataWithEmptyString(props.icon)}
        content={getDataWithEmptyString(props.content)}
        learnMore={() => props.history.push(SCREENS.IDENTIFICATIONDEFINITION)}
      />
    </>
  );
}

const styles: StylesDictionary = {
  fullName: {
    fontSize: sizes._18sdp,
    fontWeight: 600,
    color: colors.black0A2851,
    display: 'block',
    marginTop: sizes._10sdp,
    textAlign: 'center'
  },
  phone: {
    fontSize: sizes._15sdp,
    color: colors.gray7A8AA2,
    display: 'block',
    marginTop: sizes._6sdp,
    textAlign: 'center'
  }
};
