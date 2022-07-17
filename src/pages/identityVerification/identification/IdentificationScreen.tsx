import { Image } from 'antd';
import BaseButton from 'components/BaseButton';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import strings from 'configs/res/strings';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getCroppedImg } from 'utils/Utils';
import CropImage from './CropImage';
import { saveOcrData } from 'store/actions/OcrAction';
import InfoModal from 'components/modals/InfoModal';
import OCRCamera from './OCRCamera';
import {
  captureImage,
  getBacksideColor,
  getExportFileName,
  onCancelImg
} from 'utils/Containers/IdentificationContainer';
import { styles } from './styles';
import GuideModal from 'components/modals/GuideModal';
import { store } from 'store/store';

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

declare global {
  interface FormDataValue {
    uri: string;
    name: string;
    type: string;
  }

  interface FormData {
    append(name: string, value: FormDataValue, fileName?: string): void;
    set(name: string, value: FormDataValue, fileName?: string): void;
  }
}

function IdentificationScreen() {
  const tokenData = store.getState()?.tokenReducer?.valueAppToken;
  const history = useHistory();
  const [isResultFail, setIsResultFail] = useState<boolean>(false);

  const imgRef = useRef<HTMLDivElement | null>(null);

  const [srcImg, setSrcImg] = useState<any>();
  const [crop, setCrop] = useState({
    x: sizes._30sdp,
    y: sizes._80sdp,
    width: sizes._350sdp,
    height: sizes._230sdp
  });
  const layoutRef = useRef<any>(0);
  const [cameraHeight, setCameraHeight] = useState<any>();
  const [result, setResult] = useState<any>();
  const [resultFile, setResultFile] = useState<any>();
  const [frontFile, setFrontFile] = useState<any>();
  const [isFrontCapture, setIsFrontCapture] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');
  const [isShowModal, setShowModal] = useState(true);

  useEffect(() => {
    let heightCamera = 0;
    setTimeout(() => {
      heightCamera = sizes.HEIGHT - layoutRef.current?.clientHeight;
      setCameraHeight(heightCamera);
    }, 200);
    const video = document.querySelector('video');
    video?.setAttribute('playsinline', '');
    video?.setAttribute('webkit-playsinline', '');
    video?.setAttribute('autoplay', '');
    video?.setAttribute('width', '100%');
    video?.setAttribute('height', `${heightCamera}px`);
    video?.removeAttribute('controls');
  }, []);

  const onChange = (crop: any) => {
    setCrop(crop);
  };

  const onLoad = useCallback((img: any) => {
    imgRef.current = img;
  }, []);

  const onExportCapure = async () => {
    const name = getExportFileName(isFrontCapture);
    const imageCrop: any = await getCroppedImg(imgRef.current, crop, name);
    setResult(imageCrop.croppedImageUrl);
    setResultFile(imageCrop.file);
  };

  const onCancelFront = () => {
    setIsFrontCapture(false);
    setSrcImg('');
    setResult(null);
  };

  const onCancelBack = () => {
    setSrcImg('');
    setResult(null);
  };

  const onUseCapure = async () => {
    await captureImage(
      setIsFrontCapture,
      isFrontCapture,
      setFrontFile,
      resultFile,
      setSrcImg,
      setResult,
      setResultFile,
      frontFile,
      saveOcrData,
      history,
      setMessageError,
      setIsResultFail,
      tokenData.phoneNumber,
      JSON.stringify(tokenData.merchantAccountId)
    );
  };

  const handleClickQuit = () => {
    history.goBack();
  };

  const handleCloseModal = () => {
    setIsResultFail(false);
    setIsFrontCapture(false);
    setSrcImg('');
    setResult(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div ref={layoutRef} style={styles.wrapper}>
          <div style={{ marginTop: sizes._23sdp }}>
            <BaseText
              content={strings.identityVerification.takePhoto}
              textContainerStyle={styles.title}
            />
            <BaseText
              content={strings.authReportError.quit}
              textContainerStyle={styles.quitStyle}
              handleClick={handleClickQuit}
            />
          </div>
          <BaseText
            content={strings.identityVerification.tutorialTakePhoto(
              isFrontCapture
                ? strings.identityVerification.backside.toLowerCase()
                : strings.identityVerification.font.toLowerCase()
            )}
            textContainerStyle={styles.titleCCCD}
          />
          <div style={styles.wrapperFlexRow}>
            <div>
              <Image
                src={
                  isFrontCapture
                    ? images.ic_cmt_front_active
                    : images.ic_cmt_front
                }
                preview={false}
              />
              <BaseText
                content={strings.identityVerification.font}
                textContainerStyle={styles.fontStyle}
              />
            </div>
            {arr.map((v) => (
              <div
                style={{
                  ...styles.circle,
                  backgroundColor: isFrontCapture
                    ? colors.bluePrimary
                    : colors.grayD6D9E0
                }}
                key={`key-${v}`}
              />
            ))}
            <div>
              <Image
                src={
                  isFrontCapture
                    ? images.ic_cmt_back_active
                    : images.ic_cmt_back
                }
                preview={false}
                style={{ paddingLeft: sizes._7sdp }}
              />
              <BaseText
                content={strings.identityVerification.backside}
                textContainerStyle={{
                  ...styles.fontStyle,
                  ...styles.backStyle,
                  color: getBacksideColor(isFrontCapture)
                }}
              />
            </div>
          </div>
        </div>
        {!srcImg ? (
          <OCRCamera cameraHeight={cameraHeight} setSrcImg={setSrcImg} />
        ) : (
          <div style={{ marginTop: sizes._20sdp }}>
            {!result ? (
              <CropImage
                srcImg={srcImg}
                crop={crop}
                onChangeCapture={onChange}
                onLoadCapture={onLoad}
                onCancel={onCancelImg(
                  isFrontCapture,
                  onCancelBack,
                  onCancelFront
                )}
                onExportCapure={onExportCapure}
              />
            ) : (
              <div>
                <Image
                  src={result}
                  preview={false}
                  style={styles.captureStyle}
                />
                <div style={styles.wrapperButton}>
                  <BaseButton
                    title={strings.identityVerification.useCapture}
                    textContainerStyle={styles.textButton}
                    buttonContainer={styles.buttonContainer}
                    onClick={onUseCapure}
                  />
                  <BaseButton
                    title={strings.identityVerification.captureAgain}
                    buttonContainer={{
                      ...styles.buttonContainer,
                      ...styles.buttonLeft
                    }}
                    textContainerStyle={{
                      ...styles.textButton,
                      color: colors.black0A2851
                    }}
                    onClick={onCancelImg(
                      isFrontCapture,
                      onCancelBack,
                      onCancelFront
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {isResultFail ? (
        <InfoModal
          title={strings.identityVerification.CMNDInActive}
          content={messageError}
          isConfirm
          handleButton1={handleCloseModal}
        />
      ) : null}
      {isShowModal && (
        <GuideModal handleCloseModal={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default IdentificationScreen;
