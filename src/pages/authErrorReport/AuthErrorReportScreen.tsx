import vi from 'assets/languages/vi';
import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SCREENS } from 'routes/ScreensName';
import { StylesDictionary } from 'utils/Utils';
import { v4 as uuidv4 } from 'uuid';

interface AuthErrorReportScreenProps {
  history: RouteComponentProps['history'];
}

const _reportTypes = [
  {
    title: vi.identityVerification.fullName,
    isSelected: false
  },
  {
    title: vi.authReportError.dobnGender,
    isSelected: false
  },
  {
    title: vi.identityVerification.idType,
    isSelected: false
  },
  {
    title: vi.identityVerification.idNumber,
    isSelected: false
  },
  {
    title: vi.authReportError.twoDates,
    isSelected: false
  },
  {
    title: vi.authReportError.otherReason,
    isSelected: false
  }
];

export default function AuthErrorReportScreen(
  props: AuthErrorReportScreenProps
) {
  const [reportTypes, setReportTypes] = useState(_reportTypes);
  const { history } = props;

  function handleSelect(index: number) {
    const reportTypesClone = [...reportTypes];
    reportTypesClone[index].isSelected = !reportTypesClone[index].isSelected;
    if (index === 5) {
      window.scrollTo({ top: window.innerHeight, left: 0, behavior: 'smooth' });
    }
    setReportTypes(reportTypesClone);
  }

  function handleSent() {
    if (reportTypes.filter((rp) => rp.isSelected === true).length !== 0) {
      history.push(SCREENS.SUCCESSSENT);
    }
  }

  return (
    <>
      <img src={images.report} style={styles.imgTitle} />
      <BaseText
        content={vi.identityVerification.reportError}
        textContainerStyle={styles.title}
      />
      <BaseText
        content={vi.authReportError.plsSelect}
        textContainerStyle={styles.plsSelect}
      />
      <div style={{ width: '100%', padding: `${sizes._24sdp}px` }}>
        {reportTypes.map((rp, index) => (
          <div
            key={uuidv4()}
            style={styles.rpItems}
            onClick={() => handleSelect(index)}
          >
            <BaseText content={rp.title} textContainerStyle={styles.rpTitle} />
            {rp.isSelected ? (
              <img src={images.radioBtnOn} />
            ) : (
              <div style={styles.uncheck} />
            )}
          </div>
        ))}
      </div>
      {reportTypes[reportTypes.length - 1].isSelected && (
        <div style={{ width: '100%', padding: `0 ${sizes._18sdp}px` }}>
          <textarea
            placeholder={vi.authReportError.plsFeedback}
            style={styles.txtArea}
          />
        </div>
      )}
      <div style={styles.btnWrapper}>
        <BaseButton
          title={vi.identityVerification.cancel}
          onClick={() => null}
          buttonContainer={styles.tryAgainBtn}
          textContainerStyle={styles.tryAgainTxt}
        />
        <BaseButton
          title={vi.authReportError.send}
          onClick={() => handleSent()}
          buttonContainer={styles.confirmBtn}
          textContainerStyle={styles.confirmTxt}
        />
      </div>
    </>
  );
}

const styles: StylesDictionary = {
  tryAgainBtn: {
    width: sizes._184sdp,
    height: sizes._56sdp,
    background: colors.greyDCDCDC
  },
  confirmBtn: {
    width: sizes._184sdp,
    height: sizes._56sdp,
    background: colors.mainBlue
  },
  tryAgainTxt: {
    color: colors.black0A2851,
    fontWeight: 600
  },
  confirmTxt: {
    color: colors.white,
    fontWeight: 600
  },
  imgTitle: {
    margin: 'auto',
    display: 'block',
    marginTop: sizes._20sdp
  },
  title: {
    display: 'block',
    fontSize: sizes._24sdp,
    fontWeight: 600,
    color: colors.black0A2851,
    marginTop: sizes._26sdp,
    textAlign: 'center'
  },
  plsSelect: {
    display: 'block',
    fontSize: sizes._17sdp,
    color: colors.black0A2851,
    marginTop: sizes._10sdp,
    opacity: 0.7,
    textAlign: 'center'
  },
  rpItems: {
    width: '100%',
    height: sizes._60sdp,
    background: colors.greyF4F7FA,
    display: 'flex',
    borderRadius: sizes._10sdp,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `0 ${sizes._18sdp}px`,
    marginBottom: sizes._4sdp
  },
  rpTitle: {
    fontSize: sizes._17sdp,
    color: colors.black0A2851
  },
  uncheck: {
    width: sizes._24sdp,
    height: sizes._24sdp,
    borderRadius: sizes._12sdp,
    border: `2px solid ${colors.text536885}`
  },
  txtArea: {
    width: '100%',
    height: sizes._90sdp,
    borderRadius: sizes._10sdp,
    border: `1px solid ${colors.border9EAABB}`,
    outline: 'none',
    padding: `${sizes._18sdp}px`,
    caretColor: colors.mainBlue
  },
  btnWrapper: {
    padding: `0 ${sizes._18sdp}px ${sizes._48sdp}px ${sizes._18sdp}px`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};
