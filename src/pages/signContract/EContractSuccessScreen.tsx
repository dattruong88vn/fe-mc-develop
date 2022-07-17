import vi from 'assets/languages/vi';
import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React from 'react';
import { StylesDictionary } from 'utils/Utils';
import SingleLineInfo from '../components/SingleLineInfo';
import { v4 as uuidv4 } from 'uuid';

const _paymentInfos = [
  {
    title: vi.signContract.maxLimit,
    data: '2.000.000 VND'
  },
  {
    title: vi.signContract.remainingLimit,
    data: '2.000.000 VND'
  },
  {
    title: vi.signContract.paymentPeriod,
    data: 'Ngày 10 hằng tháng'
  }
];

export default function EContractSuccessScreen() {
  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.frame1}>
          <img src={images.successSign} style={styles.successSign} />
          <BaseText
            content={vi.signContract.success}
            textContainerStyle={styles.successTxt}
          />
          <BaseText
            content={vi.signContract.thanks}
            textContainerStyle={styles.thx}
          />
        </div>
        <div style={styles.line}>
          <div style={styles.round}></div>
          <div style={styles.dashed}></div>
          <div
            style={{
              ...styles.round,
              right: -sizes._12sdp
            }}
          ></div>
        </div>

        <div style={styles.frame2}>
          {_paymentInfos.map((info, index) => (
            <SingleLineInfo
              key={uuidv4()}
              infos={_paymentInfos}
              info={info}
              index={index}
            />
          ))}
        </div>
        <BaseButton
          title={vi.signContract.useNow}
          onClick={() => null}
          buttonContainer={{
            width: '100%',
            marginTop: sizes._150sdp
          }}
          textContainerStyle={{ color: colors.white }}
        />
      </div>
    </>
  );
}

const styles: StylesDictionary = {
  wrapper: {
    width: '100%',
    height: '100vh',
    padding: `${sizes._16sdp}px ${sizes._24sdp}px`,
    background: colors.colorHeader
  },
  frame1: {
    background: colors.white,
    width: '100%',
    padding: `${sizes._40sdp}px ${sizes._24sdp}px`
  },
  successSign: {
    margin: 'auto',
    display: 'block'
  },
  successTxt: {
    fontSize: sizes._24sdp,
    fontWeight: 600,
    color: colors.mainBlue,
    display: 'block',
    marginTop: sizes._30sdp,
    textAlign: 'center'
  },
  thx: {
    fontSize: sizes._16sdp,
    opacity: 0.7,
    color: colors.black0A2851,
    display: 'block',
    marginTop: sizes._14sdp,
    textAlign: 'center'
  },
  line: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    background: colors.white,
    position: 'relative'
  },
  round: {
    width: sizes._24sdp,
    height: sizes._24sdp,
    borderRadius: sizes._12sdp,
    background: colors.colorHeader,
    left: -sizes._12sdp,
    zIndex: 1,
    position: 'absolute'
  },
  dashed: {
    width: '100%',
    border: `1px dashed ${colors.black0A2851}`,
    opacity: 0.1
  },
  frame2: {
    background: colors.white,
    width: '100%',
    padding: `${sizes._40sdp}px ${sizes._24sdp}px`
  }
};
