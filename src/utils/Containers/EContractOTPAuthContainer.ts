import ResponseCode from 'apis/ResponseCode';
import colors from 'configs/res/colors';
import sizes from 'configs/res/sizes';
import { SCREENS } from 'routes/ScreensName';
import AuthenApi from 'apis/subs/authen/AuthApi';
import { VerifyData } from 'components/modals/OTPModal';
import strings from 'configs/res/strings';

interface Timer {
  min: number;
  sec: number;
}

export function countdownTimer(
  min: number,
  sec: number,
  setTime: (time: any) => void,
  intervalIds: any,
  setIntervalIds: any
) {
  const endTime = new Date();
  endTime.setMinutes(endTime.getMinutes() + min);

  const interval: any = setInterval(() => {
    sec--;
    if (sec === -1) {
      sec = 59;
      min--;
    }
    const newValue: Timer = {
      min,
      sec
    };
    if (min === 0 && sec === 0) {
      clearInterval(interval);
    }
    setTime(newValue);
  }, 1000);

  // When start come or user click resend otp, push interval id to intervalIds
  const intervalIdsClone = [...intervalIds];
  intervalIdsClone.push(interval);
  setIntervalIds(intervalIdsClone);
}

// Clear all interval id in intervalIds array
export const clearAllInterval = (intervalIds: any) => {
  for (let i = 0; i < intervalIds.length; i++) {
    clearInterval(intervalIds[i]);
  }
};

export const requestOTP = async (
  setTime: any,
  intervalIds: any,
  setIntervalIds: any,
  setCurrentPosition: any,
  phoneNumber: string,
  identityNumber: string
) => {
  const payload: any = {
    phoneNumber: phoneNumber,
    fullName: 'test',
    email: 'abc@gmail.com',
    identityCard: identityNumber,
    merchantId: 1,
    type: 'ON_BOARDING'
  };
  const res: any = await AuthenApi.register(payload);
  if (res.status === ResponseCode.SUCCESS) {
    countdownTimer(5, 0, setTime, intervalIds, setIntervalIds);
    return () => {
      clearAllInterval(intervalIds);
      setCurrentPosition(0);
    };
  }
};

export const detectInvalidOTP = (
  otpValues: any,
  countTimes: any,
  history: any,
  setCurrentPosition: any,
  setInvalidOtp: any,
  setTime: any,
  setCountTimes: any,
  merchantAccountId: number,
  phoneNumber: string,
  identityCard: string,
  setOtpErrorText: any
) => {
  if (otpValues[5]) {
    handleVerify(
      countTimes,
      otpValues,
      history,
      setCurrentPosition,
      setInvalidOtp,
      setTime,
      setCountTimes,
      merchantAccountId,
      phoneNumber,
      identityCard,
      setOtpErrorText
    );
  }
};

export const handleVerify = async (
  countTimes: number,
  otpValues: any,
  history: any,
  setCurrentPosition: any,
  setInvalidOtp: any,
  setTime: any,
  setCountTimes: any,
  merchantAccountId: number,
  phoneNumber: string,
  identityCard: string,
  setOtpErrorText: any
) => {
  const count = countTimes + 1;
  const body: any = {
    urlStepOnboarding: 'https://dev-bnpl.mcredit.com.vn/otp',
    phoneNumber: phoneNumber,
    merchantId: 1,
    identityNumber: identityCard,
    code: otpValues.join(''),
    type: 'ON_BOARDING'
  };
  const res: any = await AuthenApi.verifyOtp(body);
  // if (res.status === ResponseCode.SUCCESS && res.data.success) {

  if (res.status === ResponseCode.SUCCESS) {
    history.replace(SCREENS.REGISTER_SUCCESS);
    setCurrentPosition(0);
    // alert('OTP thành công rồi nhé!');
  } else if (res.data.statusCode === 5901) {
    setInvalidOtp(true);
  } else {
    if (count === 5) {
      setInvalidOtp(true);
      setOtpErrorText(strings.signContract.expiredOtp);
      setTime({ min: 0, sec: 0 });
      setCountTimes(0);
    } else {
      setInvalidOtp(true);
      setOtpErrorText(strings.signContract.invalidOtp);
      setCountTimes(count);
    }
  }
};

export const onChangeOTP = (
  otpValues: any,
  currentPosition: number,
  e: any,
  setCurrentPosition: any
) => {
  const cloneOtpValues = [...otpValues];
  const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
  const keyCode = value.charCodeAt();
  if (currentPosition < 6 && keyCode >= 48 && keyCode <= 57) {
    cloneOtpValues[currentPosition] = value;
    setCurrentPosition(currentPosition + 1);
  }
  return cloneOtpValues;
};

export const checkOTPFailThreeTimes = (
  time: any,
  setIsTimeout: any,
  inputEl: any,
  intervalIds: any,
  setOtpErrorText: any
) => {
  if (time.min === 0 && time.sec === 0) {
    setIsTimeout(true);
    setOtpErrorText(strings.signContract.expiredOtp);
    inputEl.current?.blur();
    clearAllInterval(intervalIds);
  } else setIsTimeout(false);
};

export const onDeleteOTP = (
  otpValues: any,
  e: any,
  currentPosition: any,
  setOtpValue: any,
  setInvalidOtp: any,
  setCurrentPosition: any
) => {
  const cloneOtpValues = [...otpValues];
  if (e.key === 'Backspace' && currentPosition > 0) {
    currentPosition--;
    cloneOtpValues[currentPosition] = '';
    setCurrentPosition(currentPosition);
    setOtpValue(cloneOtpValues);
    setInvalidOtp(false);
  }
};

export const getOTPBorderColor = (index: number, currentPosition: number) => {
  return index === 0 || index < currentPosition
    ? colors.mainBlue
    : colors.border9EAABB;
};

export const getResendColor = (isTimeout: any) => {
  return isTimeout ? colors.blue0A73F0 : colors.border9EAABB;
};

export const getPaddingStyle = (isInvalidOtp: any) => {
  return isInvalidOtp ? sizes._10sdp : sizes._55sdp;
};

export const checkResendOtp = (time: any) => {
  if (time && time?.min === 0 && time?.sec === 0) {
    return true;
  } else {
    return false;
  }
};
