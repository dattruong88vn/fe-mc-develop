import vi from 'assets/languages/vi';
import BaseText from 'components/BaseText';
import InfoBoard from 'components/InfoBoard';
import { hideLoading, showLoading } from 'components/spinnerLoading';
import Timeline from 'components/TimeLine';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SCREENS } from 'routes/ScreensName';
import { StylesDictionary } from 'utils/Utils';

interface IdentificationApproveScreenProps {
  history: RouteComponentProps['history'];
}

export default function IdentificationApproveScreen(
  props: IdentificationApproveScreenProps
) {
  const [isSuccessApproved, setSuccessApproved] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSuccessApproved(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isSuccessApproved) {
      showLoading();
      setTimeout(() => {
        props.history.replace(SCREENS.ECONTRACTCONCEPT);
        hideLoading();
      }, 5000);
    }
  }, [isSuccessApproved]);

  return (
    <>
      <Timeline step={2} containerStyle={{ paddingTop: sizes._24sdp }} />
      <img
        src={images.default_avatar}
        style={{ display: 'block', margin: 'auto', marginTop: sizes._30sdp }}
      />
      <BaseText content="Vũ Trung Hiếu" textContainerStyle={styles.fullName} />
      <BaseText content="0987654321" textContainerStyle={styles.phone} />
      <InfoBoard
        title={
          isSuccessApproved
            ? vi.identityVerification.identity
            : vi.identityVerification.approveIdentification
        }
        icon={isSuccessApproved ? images.authSuccess : images.spin_loading}
        content={
          isSuccessApproved
            ? vi.identityVerification.successIdentification
            : vi.identityVerification.plsWait
        }
        isLoading={!isSuccessApproved}
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
