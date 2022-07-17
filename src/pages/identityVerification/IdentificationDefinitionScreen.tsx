import vi from 'assets/languages/vi';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React from 'react';

// const whyContractsList = [
//   vi.signContract.whyEcontract3,
//   vi.signContract.whyEcontract4,
//   vi.signContract.whyEcontract5
// ];

export default function IdentificationDefinitionScreen() {
  return (
    <>
      <div style={styles.wrapper}>
        <img src={images.identificationDefinition} style={styles.img} />
        <div style={styles.content}>
          <BaseText
            content={vi.identityVerification.approveIdentification}
            textContainerStyle={styles.title1}
          />
          <BaseText
            content={vi.identityVerification.definitionContent1}
            textContainerStyle={styles.contentTxt}
          />
          <BaseText
            content={vi.identityVerification.definitionContent2}
            textContainerStyle={styles.contentTxt}
          />
          <BaseText
            content={vi.identityVerification.definitionContent3}
            textContainerStyle={styles.contentTxt}
          />
          <BaseText
            content={vi.identityVerification.definitionContent4}
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
    background: colors.greyF4F7FA
  },
  img: {
    display: 'block',
    margin: 'auto'
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
  contentTxt: {
    fontSize: sizes._16sdp,
    color: colors.black0A2851,
    display: 'block',
    marginTop: sizes._16sdp
  }
};
