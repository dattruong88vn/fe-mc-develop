import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import BaseTextLine from 'components/BaseTextLine';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import strings from 'configs/res/strings';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SCREENS } from 'routes/ScreensName';
import { StylesDictionary } from 'utils/Utils';
import Slider from 'react-slick';

const data = [
  {
    title: strings.authen.dayWith0Fee,
    content: strings.authen.applyIfNeed,
    icon: images.iconStepDone,
    isLine: true
  },
  {
    title: strings.authen.createWallet,
    content: strings.authen.easyConcept,
    icon: images.iconStepDone,
    isLine: true
  },
  {
    title: strings.authen.freeActive,
    content: strings.authen.freeOwner,
    icon: images.iconStepDone,
    isLine: false
  }
];

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: false
};
export default function BnplIntroductionScreen() {
  const history = useHistory();
  const [isChecked, setChecked] = useState(false);

  return (
    <>
      <div style={styles.wrapper}>
        <Slider {...settings}>
          <div style={styles.imgWrapper}>
            <img style={styles.img} src={images.bnplIntro1} />
          </div>
          <div style={styles.imgWrapper}>
            <img style={styles.img} src={images.bnplBackground} />
          </div>
        </Slider>
        <div style={styles.intro}>
          <div style={styles.logoWrapper}>
            <img style={styles.imgStyle} src={images.logoMc9Pay} />
            <img style={styles.imgConnect} src={images.logoConnect} />
          </div>
          <div
            style={{
              marginTop: sizes._13sdp
            }}
          >
            <BaseText
              textContainerStyle={styles.continueMC}
              content={strings.authen.continueWithMC}
            />
          </div>
          <div style={styles.line}></div>
          {data.map((item, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <BaseTextLine
                  title={item.title}
                  content={item.content}
                  icon={item.icon}
                  isLine={item.isLine}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div style={styles.actionFrame}>
        <div style={styles.conditionFrame}>
          {isChecked ? (
            <img
              src={images.squareChecked}
              style={{ marginRight: sizes._18sdp, marginBottom: sizes._10sdp }}
              onClick={() => setChecked(!isChecked)}
            ></img>
          ) : (
            <div
              style={styles.uncheck}
              onClick={() => setChecked(!isChecked)}
            />
          )}

          <div style={styles.conditionWrapper}>
            <BaseText
              content={strings.authen.agreeWith9Pay}
              textContainerStyle={{ fontSize: sizes._18sdp, fontWeight: 400 }}
            />
          </div>
        </div>
        <div style={styles.groupBtn}>
          <BaseButton
            title={strings.authen.openWallet}
            onClick={() => (isChecked ? history.replace(SCREENS.REGISTER) : '')}
            buttonContainer={{
              ...styles.buttonContainer,
              backgroundColor: isChecked ? '#0A73F0' : '#D6D9E0'
            }}
            textContainerStyle={{
              ...styles.textContainerStyle,
              color: isChecked ? colors.white : '#0A2851'
            }}
          />
        </div>
      </div>
    </>
  );
}

const styles: StylesDictionary = {
  wrapper: {
    position: 'relative',
    backgroundColor: '#F4F6FF',
    height: sizes._670sdp
  },
  imgWrapper: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    height: sizes._250sdp,
    objectFit: 'cover'
  },
  img: {
    width: '100%',
    height: 230,
    borderBottomRightRadius: sizes._15sdp,
    borderBottomLeftRadius: sizes._15sdp
  },
  intro: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
    borderRadius: sizes._22sdp,
    border: '1px splid #FFFFFF',
    width: '90%',
    zIndex: 20,
    top: 210,
    left: 0,
    right: 0,
    margin: 'auto',
    padding: `${sizes._15sdp}px ${sizes._20sdp}px`
  },
  logoWrapper: {
    height: sizes._60sdp,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F4F6FF',
    borderRadius: sizes._15sdp,
    position: 'relative'
  },
  imgStyle: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    height: 33
  },
  imgConnect: {
    position: 'relative',
    left: '54%',
    transform: 'translateX(-50%)'
  },
  continueMC: {
    fontWeight: 600,
    fontSize: sizes._20sdp,
    marginLeft: sizes._36sdp,
    marginTop: sizes._12sdp
  },
  line: {
    height: '1px',
    background: '#0A2851',
    opacity: 0.05,
    marginTop: sizes._16sdp
  },
  actionFrame: {
    width: '100%',
    padding: `0px ${sizes._22sdp}px ${sizes._30sdp}px ${sizes._26sdp}px`,
    background: colors.white
  },
  conditionFrame: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  uncheck: {
    width: sizes._27sdp,
    height: sizes._24sdp,
    border: `2px solid ${colors.mainBlue}`,
    borderRadius: sizes._4sdp,
    marginRight: sizes._18sdp,
    marginBottom: sizes._10sdp
  },
  groupBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  conditionWrapper: {
    width: '100%',
    marginBottom: sizes._26sdp,
    paddingTop: sizes._20sdp
  },
  buttonContainer: {
    width: '100%',
    height: sizes._60sdp
  },
  textContainerStyle: {
    fontWeight: '700'
  }
};
