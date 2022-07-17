import vi from 'assets/languages/vi';
import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React from 'react';
import { StylesDictionary } from 'utils/Utils';

interface InfoBoardProps {
  title: string;
  icon: string;
  content: string;
  learnMore: () => void;
  iconStyle?: StylesDictionary;
  isLoading?: boolean;
}

export default function InfoBoard(props: InfoBoardProps) {
  const { title, icon, content, learnMore, iconStyle, isLoading } = props;
  return (
    <div style={styles.viewIdentity}>
      <div style={styles.wrapperFlexRow}>
        <BaseText content={title} textContainerStyle={styles.identityStyle} />
        <BaseButton
          title={vi.identityVerification.lookingInfo}
          icon={images.icon_question}
          buttonContainer={styles.buttonContainer}
          textContainerStyle={{
            ...styles.identityStyle,
            ...styles.searchTextStyle
          }}
          iconContainerStyle={{ top: -sizes._3sdp }}
          onClick={() => learnMore()}
        />
      </div>
      <div style={styles.lineStyle} />
      <div style={styles.wrapperContent}>
        <div style={{ position: 'relative' }}>
          <img
            src={images.shield}
            style={{ width: sizes._45sdp, height: sizes._50sdp }}
          />
          <img
            src={icon}
            style={{
              width: sizes._24sdp,
              height: sizes._24sdp,
              position: 'absolute',
              top: `calc(50% - ${sizes._18sdp}px)`,
              left: `calc(50% - ${sizes._12sdp}px)`,
              ...iconStyle
            }}
            className={isLoading ? 'havh_loading-spinner' : undefined}
          />
        </div>

        <div style={styles.wrapperText}>
          <BaseText
            content={content}
            textContainerStyle={styles.contentStyle}
          />
        </div>
      </div>
    </div>
  );
}

const styles: StylesDictionary = {
  viewIdentity: {
    width: '90%',
    margin: 'auto',
    backgroundColor: colors.blueRGBAA73F0,
    borderRadius: sizes._8sdp,
    marginTop: sizes._30sdp,
    padding: sizes._16sdp
  },
  identityStyle: {
    fontSize: sizes._16sdp,
    fontWeight: '600'
  },
  buttonContainer: {
    height: sizes._35sdp,
    backgroundColor: 'transparent',
    paddingRight: sizes._5sdp,
    border: 'none',
    boxShadow: 'none'
  },
  lineStyle: {
    width: '100%',
    height: sizes._2sdp,
    backgroundColor: colors.white,
    marginTop: sizes._10sdp
  },
  wrapperFlexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  wrapperContent: {
    marginTop: sizes._10sdp,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center'
  },
  iconSearch: {
    width: sizes._50sdp,
    height: sizes._50sdp
  },
  wrapperText: {
    display: 'flex',
    marginLeft: sizes._20sdp,
    flexDirection: 'column'
  },
  contentStyle: {
    fontSize: sizes._16sdp,
    fontWeight: '400',
    color: colors.black0A2851
  },
  searchTextStyle: {
    color: colors.blue0A73F0
  }
};
