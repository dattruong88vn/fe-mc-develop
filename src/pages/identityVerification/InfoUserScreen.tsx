import { Image } from 'antd';
import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import Timeline from 'components/TimeLine';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import strings from 'configs/res/strings';
import PendingStep from 'pages/components/PendingStep';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SCREENS } from 'routes/ScreensName';
import { styles } from './style';
import { store } from 'store/store';
import { humanConfig } from './ekyc/HumanConfig';
import Human from '@vladmandic/human/dist/human.esm-nobundle.js';

const InfoUserScreen = () => {
  const history = useHistory();
  const location: any = useLocation();
  const onClickLookingInfo = () =>
    history.push(SCREENS.EIDENTIFICATIONDEFINITION);
  const onClickAccuracy = () => {
    history.push(SCREENS.IDENTIFICATION);
  };
  const phoneNumber: string =
    store.getState()?.tokenReducer?.valueAppToken.phoneNumber;
  const fullName: string =
    store.getState()?.tokenReducer?.valueAppToken.username;

  useEffect(() => {
    // load ekyc models
    return () => {
      const human = new Human(humanConfig);
      human.load();
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <Timeline step={2} containerStyle={{ marginBottom: sizes._20sdp }} />
        <Image
          src={images.icon_avatar}
          preview={false}
          style={styles.avatarStyle}
        />
        <BaseText
          content={fullName}
          textContainerStyle={styles.textContainerStyle}
        />
        <BaseText
          content={phoneNumber}
          textContainerStyle={styles.phoneStyle}
        />

        <div style={styles.viewIdentity}>
          <div style={styles.wrapperFlexRow}>
            <BaseText
              content={strings.identityVerification.identity}
              textContainerStyle={styles.identityStyle}
            />

            <BaseButton
              title={strings.identityVerification.lookingInfo}
              icon={images.icon_question}
              buttonContainer={styles.buttonContainer}
              textContainerStyle={{
                ...styles.identityStyle,
                ...styles.searchTextStyle
              }}
              iconContainerStyle={{ top: -sizes._3sdp }}
              onClick={onClickLookingInfo}
            />
          </div>
          <div style={styles.lineStyle} />
          <div style={{ ...styles.wrapperFlexRow, ...styles.wrapperContent }}>
            <Image
              src={images.icon_search}
              preview={false}
              style={styles.iconSearch}
            />
            <div style={styles.wrapperText}>
              <BaseText
                content={strings.identityVerification.additionalCCCD}
                textContainerStyle={styles.contentStyle}
              />
              <BaseText
                content={strings.identityVerification.doItOnlyOnce}
                textContainerStyle={styles.contentStyle}
              />
            </div>
          </div>
        </div>
        {location?.state?.isPending ? (
          <PendingStep
            img={images.faceDetecting}
            txt1={strings.authen.notVerify}
            txt2={strings.authen.plsVerify}
            txt3={strings.identityVerification.verifyNow}
            handleClick={onClickAccuracy}
          />
        ) : (
          <BaseButton
            title={strings.identityVerification.verifyNow}
            onClick={onClickAccuracy}
            buttonContainer={styles.buttonStyle}
            textContainerStyle={styles.textButton}
          />
        )}
      </div>
    </div>
  );
};

export default InfoUserScreen;
