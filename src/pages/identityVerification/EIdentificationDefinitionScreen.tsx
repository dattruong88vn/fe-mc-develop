import vi from 'assets/languages/vi';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React from 'react';

const helps = [
  vi.identityVerification.whyIsEIdentify5,
  vi.identityVerification.whyIsEIdentify6,
  vi.identityVerification.whyIsEIdentify7
];

const benefits = [
  vi.identityVerification.benefit2,
  vi.identityVerification.benefit3,
  vi.identityVerification.benefit4
];

export default function EContractDefinitionScreen() {
  return (
    <>
      <div style={styles.wrapper}>
        <img src={images.illustration} style={styles.img} />
        <div style={styles.content}>
          <BaseText
            content={vi.identityVerification.whatIsEIdentify}
            textContainerStyle={styles.title1}
          />
          <BaseText
            content={vi.identityVerification.whatIsEIdentify1}
            textContainerStyle={styles.contentTxt}
          />
          <BaseText
            content={vi.identityVerification.whatIsEIdentify2}
            textContainerStyle={styles.contentTxt}
          />
          <img src={images.holdCard} style={styles.img} />
          <BaseText
            content={vi.identityVerification.whyIsEIdentify}
            textContainerStyle={styles.title2}
          />
          <BaseText
            content={vi.identityVerification.whyIsEIdentify2}
            textContainerStyle={styles.contentTxt}
          />
          <BaseText
            content={vi.identityVerification.whyIsEIdentify3}
            textContainerStyle={styles.contentTxt}
          />
          <BaseText
            content={vi.identityVerification.whyIsEIdentify4}
            textContainerStyle={styles.contentTxt}
          />
          {helps.map((help) => (
            <div key={help} style={styles.whyWrapper}>
              <img src={images.option} />
              <BaseText content={help} textContainerStyle={styles.whyTxt} />
            </div>
          ))}
          <BaseText
            content={vi.identityVerification.benefit}
            textContainerStyle={styles.title2}
          />
          <BaseText
            content={vi.identityVerification.benefit1}
            textContainerStyle={styles.contentTxt}
          />
          {benefits.map((benefit) => (
            <div key={benefit} style={styles.whyWrapper}>
              <img src={images.option} />
              <BaseText content={benefit} textContainerStyle={styles.whyTxt} />
            </div>
          ))}
          <BaseText
            content={vi.identityVerification.guide}
            textContainerStyle={styles.title2}
          />
          <BaseText
            content={vi.identityVerification.guide2}
            textContainerStyle={styles.contentTxt}
          />
          <BaseText
            content={vi.identityVerification.guide3}
            textContainerStyle={styles.contentTxt}
          />
          <BaseText
            content={vi.identityVerification.guide4}
            textContainerStyle={styles.contentTxt}
          />
          <BaseText
            content={vi.identityVerification.guide5}
            textContainerStyle={styles.contentTxt}
          />
          <BaseText
            content={vi.identityVerification.guide6}
            textContainerStyle={styles.contentTxt}
          />
          <BaseText
            content={vi.identityVerification.guide7}
            textContainerStyle={styles.contentTxt}
          />
          <BaseText
            content={vi.identityVerification.afterAll}
            textContainerStyle={styles.contentTxt}
          />
        </div>
      </div>
    </>
  );
}

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    background: colors.greyF4F7FA,
    paddingTop: sizes._35sdp
  },
  img: {
    display: 'block',
    margin: 'auto',
    marginTop: sizes._30sdp
  },
  content: {
    width: '100%',
    padding: `${sizes._40sdp}px ${sizes._24sdp}px`,
    background: colors.white,
    borderTopLeftRadius: sizes._24sdp,
    borderTopRightRadius: sizes._24sdp,
    marginTop: sizes._16sdp
  },
  title1: {
    fontSize: sizes._24sdp,
    fontWeight: 600,
    color: colors.black0A2851
  },
  title2: {
    fontSize: sizes._24sdp,
    fontWeight: 600,
    color: colors.black0A2851,
    display: 'block',
    marginTop: sizes._35sdp
  },
  contentTxt: {
    fontSize: sizes._16sdp,
    color: colors.black0A2851,
    display: 'block',
    marginTop: sizes._16sdp
  },
  whyWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: sizes._20sdp
  },
  whyTxt: {
    fontSize: sizes._16sdp,
    color: colors.black0A2851,
    display: 'block',
    marginLeft: sizes._24sdp
  }
};
