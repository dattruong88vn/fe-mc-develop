import strings from 'assets/languages/vi';
import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import InfoModal from 'components/modals/InfoModal';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import SingleLineInfo from 'pages/components/SingleLineInfo';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SCREENS } from 'routes/ScreensName';
import styles from './styles';
import { v4 as uuidv4 } from 'uuid';

interface EContractInfoScreenProps {
  history: RouteComponentProps['history'];
}

const _walletInfos = [
  {
    title: strings.signContract.borrowingLimit,
    data: '2.000.000 VND'
  },
  {
    title: strings.signContract.dateOfMaturity,
    data: 'Ngày 10 hàng tháng'
  },
  {
    title: strings.signContract.usePurpose,
    data: 'Tiêu dùng'
  },
  {
    title: strings.signContract.serviceFee,
    data: '0đ/tháng',
    tips: true
  }
];

export default function EContractInfoScreen(props: EContractInfoScreenProps) {
  const { history } = props;
  const [isChecked, setChecked] = useState(false);
  const [isShowInfoModal, setShowInfoModal] = useState(false);

  function goToContractViewer() {
    history.push(SCREENS.ECONTRACTVIEWER);
    setChecked(true);
  }

  return (
    <>
      <div style={styles.titleFrame}>
        <BaseText
          content={strings.signContract.eContractSign}
          textContainerStyle={styles.titleText}
        />
      </div>
      <div style={styles.wrapper}>
        <BaseText
          content={strings.signContract.customerInfo.toUpperCase()}
          textContainerStyle={styles.title}
        />
        <div style={styles.customerInfoFrame}>
          <div style={styles.avatarWrapper}>
            <img src={images.fakeAvatar} style={styles.avatar} />
            <img src={images.male} style={styles.genderIcon} />
          </div>
          <div>
            <BaseText
              content="Vũ Trung Hiếu"
              textContainerStyle={styles.name}
            />
            <div style={styles.line}>
              <div style={styles.icon}>
                <img src={images.calendar} />
              </div>

              <BaseText
                content="30/10/1990"
                textContainerStyle={styles.personalInfo}
              />
            </div>
            <div style={styles.line}>
              <div style={styles.icon}>
                <img src={images.smallPhone} />
              </div>
              <BaseText
                content="0768313335"
                textContainerStyle={styles.personalInfo}
              />
            </div>
            <div style={styles.line}>
              <div style={styles.icon}>
                <img src={images.document} />
              </div>
              <BaseText
                content={`${strings.signContract.contractNumber} #1234567`}
                textContainerStyle={styles.personalInfo}
              />
            </div>
          </div>
        </div>
        <BaseText
          content={strings.signContract.MCWalletInfo.toUpperCase()}
          textContainerStyle={styles.title}
        />
        <div style={styles.noticeBoard}>
          {_walletInfos.map((info, index) => (
            <SingleLineInfo
              key={uuidv4()}
              infos={_walletInfos}
              info={info}
              index={index}
              showTips={() => setShowInfoModal(true)}
            />
          ))}
        </div>
        <div
          onClick={() => goToContractViewer()}
          style={styles.viewDetailFrame}
        >
          <img src={images.boldDocument} />
          <BaseText
            content={strings.signContract.viewDetail}
            textContainerStyle={styles.viewDetail}
          />
        </div>
      </div>
      <div style={styles.actionFrame}>
        <div style={styles.conditionFrame}>
          {isChecked ? (
            <img
              src={images.squareChecked}
              style={{ marginRight: sizes._18sdp }}
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
              content={strings.signContract.agree1}
              textContainerStyle={{ fontSize: sizes._13sdp }}
            />
            <BaseText
              content={strings.signContract.agree2}
              textContainerStyle={styles.agree2}
            />
            <BaseText
              content={strings.signContract.agree3}
              textContainerStyle={{ fontSize: sizes._13sdp }}
            />
          </div>
        </div>
        <div style={styles.groupBtn}>
          <BaseButton
            title={strings.signContract.later}
            onClick={() => null}
            buttonContainer={styles.tryAgainBtn}
            textContainerStyle={styles.tryAgainTxt}
          />
          <BaseButton
            title={strings.signContract.ok}
            onClick={() =>
              isChecked ? history.replace(SCREENS.ECONTRACTOTPAUTH) : ''
            }
            buttonContainer={styles.confirmBtn}
            textContainerStyle={styles.confirmTxt}
          />
        </div>
      </div>
      {isShowInfoModal ? (
        <InfoModal
          handleButton1={() => setShowInfoModal(false)}
          content={strings.signContract.serviceFeeContent}
        />
      ) : null}
    </>
  );
}
