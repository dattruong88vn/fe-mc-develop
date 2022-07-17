import Human from '@vladmandic/human/dist/human.esm-nobundle.js';
import { Image } from 'antd';
import BaseText from 'components/BaseText';
import { Constants } from 'configs/Constants';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import strings from 'configs/res/strings';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SCREENS } from 'routes/ScreensName';
import Webcam from 'react-webcam';
import { convertImageBase64 } from 'utils/Utils';
import EkycReview from './components/EkycReview';
import FaceFrameView from './components/FaceFrameView';
import ModalConfirm from 'components/modals/ModalConfirm';
import { parseQueryParams } from 'utils/Url';
import BaseButton from 'components/BaseButton';
import { humanConfig } from './HumanConfig';
import {
  handleFaceDetectionRun,
  handleInitAndSubmitDectection,
  handleSelfie,
  onRunDetection,
  onTryAgain,
  runSoundPlayer
} from 'utils/Containers/EkycContainer';
import {
  btnConfirm,
  btnWrapper,
  cancelText,
  container,
  image,
  quitStyle,
  textContainerStyle,
  textStyle,
  viewText,
  webcamStyle,
  wrapperBottom,
  wrapperImage
} from './styles';
import { store } from 'store/store';
import { useSelector } from 'react-redux';

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

function EkycScreen() {
  const tokenData = store.getState()?.tokenReducer?.valueAppToken;
  const ocrLessData = useSelector(
    (state: any) => state.ocrReducer?.ocrData?.ocr
  );
  const history = useHistory();
  const location: any = useLocation();
  const params = parseQueryParams(location);
  const webcam = useRef<Webcam>(null);
  const isStepDone = useRef<boolean>(false);
  const isStepCompleted = useRef<boolean>(false);
  const isImgModal = useRef<boolean>(false);
  const soundPlayer = useRef<any>();

  const [selfiePicture, setSelfiePicture] = useState<any>();
  const [selfieRightPicture, setSelfieRightPicture] = useState<any>();
  const [selfieLeftPicture, setSelfieLeftPicture] = useState<any>();
  const [allState, setAllState] = useState<any>({
    imgBase64: '',
    previousStep: '',
    step: Constants.DETECT_FACE.STRAIGHT,
    currentStep: Constants.DETECT_FACE.STRAIGHT,
    icon: images.ic_front,
    description: strings.identityVerification.lookDirectly
  });
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [ekycReviewData, setEkycReviewData] = useState({
    handleBlueButton: () => undefined,
    handleWhiteButton: () => undefined,
    imgUrl: ''
  });
  const [isShowMessageDelay, setIsShowMessageDelay] = useState(false);
  const [resetRunDetection, setResetRunDetection] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  // run Audio
  const playAudio = (audio: any) => new Audio(audio);

  // run detection
  useEffect(() => {
    isStepDone.current = false;
    isStepCompleted.current = false;
    onRunDetection(isStarted, runFaceDetection);
  }, [webcam.current?.video?.readyState, allState.step, resetRunDetection]);

  useEffect(() => {
    // turn off full screen, autoplay
    const video = document.querySelector('video');
    video?.setAttribute('playsinline', '');
    video?.setAttribute('webkit-playsinline', '');
    video?.setAttribute('autoplay', '');
    video?.removeAttribute('controls');
  }, []);

  useEffect(() => {
    runSoundPlayer(allState, soundPlayer, playAudio, isStarted);
    return () => {
      soundPlayer.current.pause();
    };
  }, [allState.step, isStarted]);

  const takePicture = async () => {
    if (!isStepCompleted.current) {
      onSelfie(strings.identityVerification.middle);
    }
  };

  const handleClickQuit = () => {
    history.push(SCREENS.HEALTH);
  };

  const onSelfie = (name: string) => {
    const imagePicture = webcam.current?.getScreenshot();
    handleSelfie(imagePicture, name, isStepCompleted, isStepDone, setAllState);
  };

  const handleUseImg = async (
    nextStep: number,
    name: string,
    setPicture: any
  ) => {
    const imageSelfie = await convertImageBase64(
      allState.imgBase64,
      `${name}.jpg`
    );
    isImgModal.current = true;
    setPicture(imageSelfie);
    setAllState((prevState: any) => ({
      ...prevState,
      step: nextStep,
      currentStep: nextStep,
      imgBase64: ''
    }));
    setIsShowModal(false);
  };

  const handleTryAgain = () => {
    onTryAgain(allState, setAllState, setIsShowModal);
  };

  const runFaceDetection = async () => {
    const human = new Human(humanConfig);
    if (webcam.current && !allState.imgBase64) {
      const videoCurrent = webcam.current as any;
      handleFaceDetectionRun(
        human,
        videoCurrent,
        allState,
        takePicture,
        resetRunDetection,
        setResetRunDetection,
        setAllState,
        isStepDone,
        onSelfie,
        setIsShowMessageDelay
      );
    } else {
      await handleInitAndSubmitDectection(
        isStepCompleted,
        allState,
        isImgModal,
        setAllState,
        setEkycReviewData,
        handleUseImg,
        setSelfiePicture,
        setSelfieLeftPicture,
        setSelfieRightPicture,
        handleTryAgain,
        setResetRunDetection,
        setIsShowModal,
        params,
        selfiePicture,
        selfieLeftPicture,
        selfieRightPicture,
        human,
        history,
        location?.state,
        tokenData,
        ocrLessData
      );
    }
  };

  return (
    <div>
      <div style={container}>
        <div
          style={{
            position: 'relative',
            width: '100%'
          }}
        >
          <Webcam
            audio={false}
            ref={webcam}
            imageSmoothing={true}
            width={sizes._414sdp}
            height={sizes._500sdp}
            forceScreenshotSourceSize
            screenshotFormat="image/jpeg"
            style={webcamStyle}
            mirrored
          />
          <div style={viewText}>
            <BaseText
              content={strings.identityVerification.faceCapture}
              textContainerStyle={textStyle}
            />
            <BaseText
              content={strings.authReportError.quit}
              textContainerStyle={quitStyle}
              handleClick={handleClickQuit}
            />
          </div>
          <div style={{ zIndex: 99, position: 'absolute', top: 0, left: 0 }}>
            <FaceFrameView />
          </div>
        </div>
        {!isStarted ? (
          <div style={wrapperBottom}>
            <BaseText
              content={strings.identityVerification.ekycStartMess}
              textContainerStyle={{
                ...textContainerStyle,
                textAlign: 'center'
              }}
            />
            <div style={btnWrapper}>
              <BaseButton
                title={strings.identityVerification.startEkyc}
                onClick={() => {
                  setIsStarted(true);
                }}
                buttonContainer={btnConfirm}
                textContainerStyle={cancelText}
              />
            </div>
          </div>
        ) : (
          <div style={wrapperBottom}>
            <div style={wrapperImage}>
              <Image src={allState.icon} style={image} preview={false} />
            </div>
            <BaseText
              content={allState.description}
              textContainerStyle={{
                ...textContainerStyle,
                marginBottom: sizes._50sdp
              }}
            />
          </div>
        )}
      </div>
      {isShowModal ? (
        <EkycReview
          handleBlueButton={ekycReviewData?.handleBlueButton}
          handleWhiteButton={ekycReviewData?.handleWhiteButton}
          imgUrl={ekycReviewData?.imgUrl}
        />
      ) : null}

      {isShowMessageDelay ? (
        <ModalConfirm
          handleCloseModal={() => {
            setIsShowMessageDelay(false);
          }}
          content={strings.identityVerification.delayMessage}
          title={strings.identityVerification.waitingCompleted}
          onPressLeft={() => {
            history.push(SCREENS.HEALTH);
          }}
          onPressRight={() => {
            if (allState.step !== Constants.DETECT_FACE.STRAIGHT) {
              setAllState({
                imgBase64: '',
                previousStep: '',
                step: Constants.DETECT_FACE.STRAIGHT,
                currentStep: Constants.DETECT_FACE.STRAIGHT,
                icon: images.ic_front,
                description: strings.identityVerification.lookDirectly
              });
            }
            setResetRunDetection(0);
            setIsShowMessageDelay(false);
          }}
          isButtonLeft={true}
          isButtonRight={true}
          textButtonRight={strings.signContract.ok}
        />
      ) : null}
    </div>
  );
}

export default EkycScreen;
