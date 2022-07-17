import vi from 'assets/languages/vi';
import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import InfoBoard from 'components/InfoBoard';
import Timeline from 'components/TimeLine';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import { Location } from 'history';
import PendingStep from 'pages/components/PendingStep';
import React from 'react';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { SCREENS } from 'routes/ScreensName';
import { StylesDictionary } from 'utils/Utils';

interface LocationState {
  isPending: Location;
}

export default function EContractConceptScreen(
  props: RouteComponentProps<{}, StaticContext, LocationState>
) {
  return (
    <>
      <Timeline step={3} containerStyle={{ paddingTop: sizes._24sdp }} />
      <div style={styles.avatarWrapper}>
        <img src={images.fakeAvatar} style={{ borderRadius: '50%' }} />
        <img src={images.male} style={styles.genderIcon} />
      </div>
      <BaseText content="Vũ Trung Hiếu" textContainerStyle={styles.fullName} />
      <BaseText content="0987654321" textContainerStyle={styles.phone} />
      <InfoBoard
        title={vi.signContract.signContract}
        icon={images.star}
        content={vi.signContract.purpose}
        learnMore={() => props.history.push(SCREENS.ECONTRACTDEFINITION)}
      />
      {props.location.state?.isPending ? (
        <PendingStep
          handleClick={() => props.history.push(SCREENS.ECONTRACTINFO)}
        />
      ) : (
        <div style={styles.btnWrapper}>
          <BaseButton
            onClick={() => {
              props.history.push(SCREENS.ECONTRACTINFO);
            }}
            title={vi.signContract.signContract}
            buttonContainer={{ width: '100%' }}
            textContainerStyle={{ color: colors.white }}
          />
        </div>
      )}
    </>
  );
}

const styles: StylesDictionary = {
  btnWrapper: {
    width: '100%',
    bottom: 0,
    padding: `0 ${sizes._24sdp}px ${sizes._48sdp}px ${sizes._24sdp}px`,
    position: 'fixed'
  },
  avatarWrapper: {
    width: sizes._100sdp,
    height: sizes._100sdp,
    background: colors.blurblue2,
    borderRadius: sizes._50sdp,
    margin: 'auto',
    marginTop: sizes._33sdp,
    position: 'relative'
  },
  genderIcon: {
    right: 0,
    bottom: 0,
    position: 'absolute'
  },
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
