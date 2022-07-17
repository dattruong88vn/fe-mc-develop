import VerifyStep from 'components/VerifyStep';
import images from 'configs/res/images';
import strings from 'configs/res/strings';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SCREENS } from 'routes/ScreensName';

interface EContractOTPProps {
  history: RouteComponentProps['history'];
}

export default function EContractOTPSuccessScreen(props: EContractOTPProps) {
  return (
    <>
      <VerifyStep
        step={3}
        icon={images.authSuccess}
        history={props.history}
        title={strings.signContract.signContract}
        content={strings.signContract.signContractSucess}
        nextScreen={SCREENS.ECONTRACTSUCCESS}
      />
    </>
  );
}
