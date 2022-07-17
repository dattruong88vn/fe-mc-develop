import vi from 'assets/languages/vi';
import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import InputModal from 'components/modals/InputModal';
import SelectModal from 'components/modals/SelectModal';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import SingleLineInfo from 'pages/components/SingleLineInfo';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SCREENS } from 'routes/ScreensName';
import { LocationObj } from '../../../components/modals/SelectModal';
import SelectBox from './SelectBox';
import styles from './styles';
// import detailInfoUser from '__tests__/data/verifyInfoUserScreen/DetailInfoUser.json';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
interface VerifyInfoUserScreenProps {
  history: RouteComponentProps['history'];
}

const imgList = [
  'https://static01.nyt.com/images/2015/01/12/nyregion/12MUNI/12MUNI-facebookJumbo.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/New_lithuanian_ID_card_%282021%29_%28front%29.png/640px-New_lithuanian_ID_card_%282021%29_%28front%29.png',
  'https://expressdocumentline.com/wp-content/uploads/2021/06/buy-USA-id-Card-online.jpg'
];

export default function VerifyInfoUserScreen(props: VerifyInfoUserScreenProps) {
  const orcFullData = useSelector((state: any) => state.ocrReducer?.ocrData);
  const ocrLessData = useSelector(
    (state: any) => state.ocrReducer?.ocrData?.ocr
  );
  const token = useSelector((state: any) => state.tokenReducer.valueAppToken);
  const _idInfos = [
    {
      title: vi.identityVerification.idType,
      data: orcFullData?.cardType
    },
    {
      title: vi.identityVerification.idNumber,
      data: ocrLessData?.id_number
    },
    {
      title: vi.identityVerification.idPlace,
      data:
        orcFullData?.cardType === 'CCCD_CHIP'
          ? 'CỤC CẢNH SÁT CƯ TRÚ VÀ DÂN CƯ'
          : 'Việt Nam'
    },
    {
      title: vi.identityVerification.idDate,
      data: ocrLessData?.issued_date
    },
    {
      title: vi.identityVerification.expireDate,
      data: ocrLessData?.expiry_date
    }
  ];

  const _personalInfos = [
    {
      title: vi.identityVerification.fullName,
      data: ocrLessData?.name
    },
    {
      title: vi.identityVerification.dob,
      data: ocrLessData?.dob
    },
    {
      title: vi.identityVerification.gender,
      data: ocrLessData?.gender
    },
    {
      title: vi.authen.phoneNumber,
      data: token?.profile?.phoneNumber
    },
    {
      title: vi.identityVerification.email,
      data: token?.profile?.email,
      isRequire: true
    }
  ];

  const [isShowModal, setShowModal] = useState(false);
  const [idInfos, setIdInfos] = useState(_idInfos);
  const [personalInfos, setPersonalInfos] = useState(_personalInfos);

  const [isShowSelectModal, setShowSelectModal] = useState(0);
  const [fullAddr, setFullAddr] = useState('');
  const [isValidate, setValidate] = useState(false);

  const [province, setProvince] = useState<LocationObj | null>(null);
  const [district, setDistrict] = useState<LocationObj | null>(null);
  const [ward, setWard] = useState<LocationObj | null>(null);

  useEffect(() => {
    // const { ocr } = detailInfoUser.data;
    const idInfosFromSrv = [
      orcFullData?.cardType,
      ocrLessData?.id_number,
      orcFullData?.cardType === 'CCCD_CHIP'
        ? 'CỤC CẢNH SÁT CƯ TRÚ VÀ DÂN CƯ'
        : 'Việt Nam',
      ocrLessData?.issued_date,
      ocrLessData?.expiry_date
    ];
    const personalInfosFromSrv = [
      ocrLessData?.name,
      ocrLessData?.dob,
      ocrLessData?.gender,
      token?.phoneNumber,
      token?.email ?? '+ Thêm email'
    ];
    setFullAddr(ocrLessData?.address);
    const idInfosClone = [...idInfos];
    idInfosClone.forEach((info, index) => (info.data = idInfosFromSrv[index]));
    setIdInfos(idInfosClone);

    const personalInfosClone = [...personalInfos];

    // existed email
    if (token?.email) {
      personalInfosClone[4].isRequire = false;
    }
    personalInfosClone.forEach(
      (info, index) => (info.data = personalInfosFromSrv[index])
    );
    setPersonalInfos(personalInfosClone);
  }, []);

  function addEmail(email: string) {
    const personalInfosClone = [...personalInfos];
    personalInfosClone[4].data = email;
    personalInfosClone[4].isRequire = false;
    setPersonalInfos(personalInfosClone);
  }

  function handleConfirm() {
    setValidate(true);
    if (fullAddr && personalInfos[4].data !== '+ Thêm email') {
      props.history.replace(SCREENS.IDENTIFICATIONAPPROVE);
    }
  }

  function handleSelect(value: LocationObj, type: number) {
    switch (type) {
      case 1:
        setProvince(value);
        setDistrict(null);
        setWard(null);
        break;
      case 2:
        setDistrict(value);
        setWard(null);
        break;
      case 3:
        setWard(value);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div style={styles.wrapper}>
        <BaseText
          content={vi.identityVerification.verifyAuthInfo}
          textContainerStyle={styles.title}
        />
        <div style={styles.noticeWrapper}>
          <img src={images.notice} />
          <BaseText
            content={vi.identityVerification.notice}
            textContainerStyle={styles.textNoti}
          />
        </div>
        <BaseText
          content={vi.identityVerification.idInfo.toUpperCase()}
          textContainerStyle={styles.titleId}
        />
        <div style={styles.infoFrame}>
          <div style={styles.noticeBoard}>
            {idInfos.map((info, index) => (
              <SingleLineInfo
                key={uuidv4()}
                infos={idInfos}
                info={info}
                index={index}
              />
            ))}
          </div>
        </div>
        <BaseText
          content={vi.identityVerification.personalInfo.toUpperCase()}
          textContainerStyle={styles.titleId}
        />
        <div style={styles.infoFrame}>
          <div style={styles.noticeBoard}>
            {personalInfos.map((info, index) => (
              <SingleLineInfo
                key={uuidv4()}
                openEmailModal={() => setShowModal(true)}
                infos={idInfos}
                info={info}
                index={index}
                isValidate={isValidate}
              />
            ))}
          </div>
        </div>
        <BaseText
          content={vi.identityVerification.residentInfo.toUpperCase()}
          textContainerStyle={styles.titleId}
        />
        <div style={{ width: '100%', padding: `0 ${sizes._18sdp}px` }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <SelectBox
              title={vi.identityVerification.province}
              handleClick={() => setShowSelectModal(1)}
              valueSelect={province}
            />
            <SelectBox
              title={vi.identityVerification.district}
              handleClick={() => setShowSelectModal(2)}
              valueSelect={district}
            />
          </div>
          <SelectBox
            title={vi.identityVerification.ward}
            width="100%"
            handleClick={() => setShowSelectModal(3)}
            valueSelect={ward}
          />
          <SelectBox
            isInput
            title={vi.identityVerification.exactAddress}
            width="100%"
            fullAddr={fullAddr}
            handleChangeAddr={(text) => setFullAddr(text)}
            isValidate={isValidate}
          />
        </div>
        <div style={styles.imgWrapper}>
          {imgList.map((img, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} style={styles.imgFrame}>
              <img
                src={images.imgChecked}
                style={{ position: 'absolute', right: -7, top: -7 }}
              />
              <img src={img} style={styles.img} />
            </div>
          ))}
        </div>
        <div style={styles.divide} />
        <div
          style={{
            padding: `${sizes._24sdp}px ${sizes._18sdp}px ${sizes._48sdp}px ${sizes._18sdp}px`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <BaseButton
            title={vi.identityVerification.tryAgain}
            onClick={() => null}
            buttonContainer={styles.tryAgainBtn}
            textContainerStyle={styles.tryAgainTxt}
          />
          <BaseButton
            title={vi.identityVerification.confirm}
            onClick={() => handleConfirm()}
            buttonContainer={styles.confirmBtn}
            textContainerStyle={styles.confirmTxt}
          />
        </div>
      </div>
      {isShowModal && (
        <InputModal
          addEmail={(email) => addEmail(email)}
          handleCloseModal={() => setShowModal(false)}
        />
      )}
      {isShowSelectModal ? (
        <SelectModal
          handleCloseModal={() => setShowSelectModal(0)}
          isShowSelectModal={isShowSelectModal}
          handleSelect={(value, type) => handleSelect(value, type)}
          province={province}
          district={district}
        />
      ) : null}
    </>
  );
}
