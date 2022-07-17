import ResponseCode from 'apis/ResponseCode';
import EkycApi from 'apis/subs/ekyc/EkycApi';
import { Constants } from 'configs/Constants';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import sounds from 'configs/res/sounds';
import strings from 'configs/res/strings';
import { SCREENS } from 'routes/ScreensName';

export const onRunDetection = (isStarted: any, runFaceDetection: any) => {
  if (isStarted) {
    setTimeout(() => {
      runFaceDetection();
    }, 500);
  }
};

export const runSoundPlayer = (
  allState: any,
  soundPlayer: any,
  playAudio: any,
  isStarted: any
) => {
  if (allState.step !== 4) {
    if (allState.step === Constants.DETECT_FACE.STRAIGHT) {
      soundPlayer.current = playAudio(sounds.look_forward);
    } else if (allState.step === Constants.DETECT_FACE.LEFT) {
      soundPlayer.current = playAudio(sounds.turn_left);
    } else if (allState.step === Constants.DETECT_FACE.RIGHT) {
      soundPlayer.current = playAudio(sounds.turn_right);
    } else if (allState.step === Constants.DETECT_FACE.CLOSEEYE) {
      soundPlayer.current = playAudio(sounds.close_eyes);
    }
    if (isStarted) {
      soundPlayer.current.play();
    }
  }
};

export const getNextStep = (currentStep: number) => {
  switch (currentStep) {
    case Constants.DETECT_FACE.STRAIGHT:
      return Constants.DETECT_FACE.LEFT;

    case Constants.DETECT_FACE.LEFT:
      return Constants.DETECT_FACE.RIGHT;

    case Constants.DETECT_FACE.RIGHT:
      return Constants.DETECT_FACE.CLOSEEYE;

    case Constants.DETECT_FACE.CLOSEEYE:
      return Constants.DETECT_FACE.DONE;

    case Constants.DETECT_FACE.DONE:
      return Constants.DETECT_FACE.DONE;

    default:
      return Constants.DETECT_FACE.UNKNOW;
  }
};

export const noResultDetected = (
  videoCurrent: any,
  resetRunDetection: number,
  setIsShowMessageDelay: (c: boolean) => void,
  setResetRunDetection: (c: number) => void
) => {
  if (videoCurrent?.state?.hasUserMedia && resetRunDetection > 1) {
    setIsShowMessageDelay(true);
  } else {
    setResetRunDetection(resetRunDetection + 1);
  }
};

const handleStraightDetection = (
  straight: any,
  takePicture: any,
  setResetRunDetection: (c: number) => void,
  resetRunDetection: number
) => {
  if (straight.length > 0) {
    takePicture();
  } else {
    setResetRunDetection(resetRunDetection + 1);
  }
};

const handleLeftDetection = (
  faceLeft: any,
  isStepDone: any,
  onSelfie: any,
  setResetRunDetection: (c: number) => void,
  resetRunDetection: number
) => {
  if (faceLeft.length > 0) {
    if (!isStepDone.current) {
      onSelfie(strings.identityVerification.left);
    }
  } else {
    setResetRunDetection(resetRunDetection + 1);
  }
};

const handleRightDetection = (
  faceRight: any,
  isStepDone: any,
  onSelfie: any,
  setResetRunDetection: (c: number) => void,
  resetRunDetection: number
) => {
  if (faceRight.length > 0) {
    if (!isStepDone.current) {
      onSelfie(strings.identityVerification.right);
    }
  } else {
    setResetRunDetection(resetRunDetection + 1);
  }
};

const handleCloseEyesDetection = (
  closeEyes: any,
  isStepDone: any,
  onSelfie: any,
  setResetRunDetection: (c: number) => void,
  resetRunDetection: number
) => {
  if (closeEyes.length > 0) {
    if (!isStepDone.current) {
      isStepDone.current = true;
      onSelfie(strings.identityVerification.closedEyeImg);
    }
  } else {
    setResetRunDetection(resetRunDetection + 1);
  }
};

export const faceDetected = (
  allState: any,
  result: any,
  takePicture: any,
  resetRunDetection: number,
  setResetRunDetection: (c: number) => void,
  setAllState: any,
  isStepDone: any,
  onSelfie: any
) => {
  let straight = [];
  let faceLeft = [];
  let faceRight = [];
  let closeEyes = [];
  switch (allState.step) {
    case Constants.DETECT_FACE.STRAIGHT:
      setTimeout(() => {
        straight = result.filter(
          (item: any) =>
            item.face === 0 && item.gesture === Constants.STATUS_FACE.CENTER
        );

        handleStraightDetection(
          straight,
          takePicture,
          setResetRunDetection,
          resetRunDetection
        );
      }, 300);
      break;
    case Constants.DETECT_FACE.LEFT:
      faceLeft = result.filter(
        (item: any) =>
          item.face === 0 && item.gesture === Constants.STATUS_FACE.LEFT
      );
      setAllState((prevState: any) => ({
        ...prevState,
        icon: images.ic_font_left,
        description: strings.identityVerification.lookLeft
      }));

      handleLeftDetection(
        faceLeft,
        isStepDone,
        onSelfie,
        setResetRunDetection,
        resetRunDetection
      );
      break;
    case Constants.DETECT_FACE.RIGHT:
      faceRight = result.filter(
        (item: any) =>
          item.face === 0 && item.gesture === Constants.STATUS_FACE.RIGHT
      );
      setAllState((prevState: any) => ({
        ...prevState,
        icon: images.ic_font_right,
        description: strings.identityVerification.lookRight
      }));

      handleRightDetection(
        faceRight,
        isStepDone,
        onSelfie,
        setResetRunDetection,
        resetRunDetection
      );
      break;
    case Constants.DETECT_FACE.CLOSEEYE:
      closeEyes = result.filter(
        (item: any) =>
          item.face === 0 &&
          (item.gesture === Constants.STATUS_FACE.CLOSE_EYE_LEFT ||
            item.gesture === Constants.STATUS_FACE.CLOSE_EYE_RIGHT)
      );
      setAllState((prevState: any) => ({
        ...prevState,
        icon: images.ic_close_eyes,
        description: strings.identityVerification.closeEyes
      }));

      handleCloseEyesDetection(
        closeEyes,
        isStepDone,
        onSelfie,
        setResetRunDetection,
        resetRunDetection
      );
      break;
    default:
      break;
  }
};

export const initEkycReviewData = (
  setEkycReviewData: (c: any) => void,
  allState: any,
  handleUseImg: any,
  nextStep: any,
  setSelfiePicture: any,
  setSelfieLeftPicture: any,
  setSelfieRightPicture: any,
  handleTryAgain: any
) => {
  setEkycReviewData({
    handleBlueButton: () => {
      switch (allState.previousStep) {
        case Constants.DETECT_FACE.STRAIGHT:
          handleUseImg(
            nextStep,
            strings.identityVerification.middle,
            setSelfiePicture
          );
          break;
        case Constants.DETECT_FACE.LEFT:
          handleUseImg(
            nextStep,
            strings.identityVerification.left,
            setSelfieLeftPicture
          );
          break;
        case Constants.DETECT_FACE.RIGHT:
          handleUseImg(
            nextStep,
            strings.identityVerification.right,
            setSelfieRightPicture
          );
          break;
        default:
          break;
      }
    },
    handleWhiteButton: () => {
      handleTryAgain();
    },
    imgUrl: allState.imgBase64
  });
};

export const handleSubmitEkyc = async (
  setAllState: any,
  selfiePicture: any,
  selfieLeftPicture: any,
  selfieRightPicture: any,
  human: any,
  history: any,
  tokenData?: any,
  ocrData?: any
) => {
  setAllState((prevState: any) => ({
    ...prevState,
    icon: images.ic_check,
    description: strings.identityVerification.hasRecorded
  }));

  const data = new FormData();
  data.append('phoneNumber', tokenData.phoneNumber);
  data.append('merchantAccountId', tokenData.merchantAccountId);
  data.append('urlStepOnboarding', 'https://uat-bnpl.mcredit.com.vn/ekyc');
  data.append('mode', 'FACE');
  data.append('type', 'WEB');
  data.append('ekycDTO', JSON.stringify(ocrData));

  data.append('selfie', selfiePicture);
  data.append('left', selfieLeftPicture);
  data.append('right', selfieRightPicture);

  console.log(selfiePicture, selfieLeftPicture, selfieRightPicture);
  const res: any = await EkycApi.checkEkyc(data);
  if (res.status === ResponseCode.SUCCESS) {
    human.reset();
    window.indexedDB.deleteDatabase('tensorflowjs');
    history.push({
      pathname: SCREENS.VERIFYINFOUSER
    });
  } else {
    history.push({
      pathname: SCREENS.RESULT_EKYC
    });
  }
};

export const onTryAgain = (
  allState: any,
  setAllState: any,
  setIsShowModal: (c: boolean) => void
) => {
  switch (allState.currentStep) {
    case 0:
      setAllState((prevState: any) => ({
        ...prevState,
        step: prevState.previousStep,
        imgBase64: '',
        icon: images.ic_front,
        description: strings.identityVerification.lookDirectly
      }));
      break;
    case 1:
      setAllState((prevState: any) => ({
        ...prevState,
        step: prevState.previousStep,
        imgBase64: '',
        icon: images.ic_font_left,
        description: strings.identityVerification.lookLeft
      }));
      break;
    case 2:
      setAllState((prevState: any) => ({
        ...prevState,
        step: prevState.previousStep,
        imgBase64: '',
        icon: images.ic_font_right,
        description: strings.identityVerification.lookRight
      }));
      break;
    default:
      break;
  }
  setIsShowModal(false);
};

export const getEkycResultImg = (location: any) => {
  return location?.state?.isSuccess ? images.ekyc_success : images.ekyc_fail;
};

export const getEkycResultTitle = (location: any) => {
  return location?.state?.isSuccess
    ? strings.identityVerification.ekycSuccess
    : strings.identityVerification.ekycFail;
};

export const getEkycResultContent = (location: any) => {
  return !location?.state?.isSuccess && location?.state?.failTimes === 10
    ? strings.identityVerification.ekycMore10
    : location?.state?.isSuccess
    ? ''
    : strings.identityVerification.ekycContentFail;
};

export const getEkycResultButton1 = (location: any) => {
  return !location?.state?.isSuccess && location?.state?.failTimes === 10
    ? strings.identityVerification.ekycExit
    : location?.state?.isSuccess
    ? strings.identityVerification.continue
    : strings.identityVerification.ekycTryAgain;
};

export const getEkycResultButton2 = (location: any) => {
  return !location?.state?.isSuccess && location?.state?.failTimes === 10
    ? ''
    : location?.state?.isSuccess
    ? ''
    : strings.identityVerification.ekycExit;
};

export const checkIsSecondButton = (location: any) => {
  return !location?.state?.isSuccess && location?.state?.failTimes === 10
    ? false
    : location?.state?.isSuccess
    ? false
    : true;
};

export const handleBlueButtonResult = (
  location: any,
  backToHome: any,
  goToNextStep: any,
  tryAgain: any
) => {
  return !location?.state?.isSuccess && location?.state?.failTimes === 10
    ? backToHome
    : location?.state?.isSuccess
    ? goToNextStep
    : tryAgain;
};

export const getButtonWrapperStyle = (location: any) => {
  return !location?.state?.isSuccess && location?.state?.failTimes === 10
    ? { marginTop: sizes._205sdp }
    : location?.state?.isSuccess
    ? { marginTop: sizes._300sdp }
    : { marginTop: sizes._205sdp };
};

export const handleSelfie = (
  imagePicture: any,
  name: string,
  isStepCompleted: any,
  isStepDone: any,
  setAllState: any
) => {
  if (imagePicture) {
    if (name === strings.identityVerification.middle) {
      isStepCompleted.current = true;
    } else {
      isStepDone.current = true;
    }
    setAllState((prevState: any) => ({
      ...prevState,
      step: Constants.DETECT_FACE.DONE,
      previousStep: prevState.currentStep,
      imgBase64: imagePicture
    }));
  }
};

export const handleFaceDetectionRun = (
  human: any,
  videoCurrent: any,
  allState: any,
  takePicture: any,
  resetRunDetection: any,
  setResetRunDetection: any,
  setAllState: any,
  isStepDone: any,
  onSelfie: any,
  setIsShowMessageDelay: any
) => {
  human.detect(videoCurrent.video).then(async (res: any) => {
    const result = await res.gesture;
    if (result.length > 0) {
      faceDetected(
        allState,
        result,
        takePicture,
        resetRunDetection,
        setResetRunDetection,
        setAllState,
        isStepDone,
        onSelfie
      );
    } else {
      noResultDetected(
        videoCurrent,
        resetRunDetection,
        setIsShowMessageDelay,
        setResetRunDetection
      );
    }
    if (!human?.process?.tensor) {
      setResetRunDetection(resetRunDetection + 1);
    }
  });
};

export const handleInitAndSubmitDectection = async (
  isStepCompleted: any,
  allState: any,
  isImgModal: any,
  setAllState: any,
  setEkycReviewData: any,
  handleUseImg: any,
  setSelfiePicture: any,
  setSelfieLeftPicture: any,
  setSelfieRightPicture: any,
  handleTryAgain: any,
  setResetRunDetection: any,
  setIsShowModal: any,
  params: any,
  selfiePicture: any,
  selfieLeftPicture: any,
  selfieRightPicture: any,
  human: any,
  history: any,
  paramState?: any,
  tokenData?: any,
  ocrData?: any
) => {
  if (
    !isStepCompleted.current &&
    allState.step === Constants.DETECT_FACE.DONE &&
    isImgModal
  ) {
    isImgModal.current = false;
    isStepCompleted.current = true;
    const nextStep = getNextStep(allState.currentStep);
    if (nextStep !== Constants.DETECT_FACE.DONE) {
      setAllState((prevState: any) => ({
        ...prevState,
        icon: images.ic_check,
        description: strings.identityVerification.hasRecorded
      }));

      // set modal data
      initEkycReviewData(
        setEkycReviewData,
        allState,
        handleUseImg,
        nextStep,
        setSelfiePicture,
        setSelfieLeftPicture,
        setSelfieRightPicture,
        handleTryAgain
      );
      setResetRunDetection(0);
      setIsShowModal(true);
    } else {
      await handleSubmitEkyc(
        setAllState,
        selfiePicture,
        selfieLeftPicture,
        selfieRightPicture,
        human,
        history,
        tokenData,
        ocrData
      );
    }
  }
};
