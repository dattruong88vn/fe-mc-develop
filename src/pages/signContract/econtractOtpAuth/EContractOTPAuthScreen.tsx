import ResponseCode from 'apis/ResponseCode';
import strings from 'assets/languages/vi';
import BaseText from 'components/BaseText';
import InfoModal from 'components/modals/InfoModal';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import WarningMessage from 'pages/components/WarningMessage';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { store } from 'store/store';
import {
  checkOTPFailThreeTimes,
  countdownTimer,
  detectInvalidOTP,
  onChangeOTP,
  onDeleteOTP,
  getOTPBorderColor,
  getResendColor,
  getPaddingStyle,
  checkResendOtp,
  clearAllInterval
} from 'utils/Containers/EContractOTPAuthContainer';
import { v4 as uuidv4 } from 'uuid';
import AuthenApi from 'apis/subs/authen/AuthApi';
import { SCREENS } from 'routes/ScreensName';

interface Timer {
  min: number;
  sec: number;
}

export interface VerifyData {
  urlStepOnboarding: string;
  phoneNumber: string;
  merchantAccountId: number;
  code: string;
  type: string;
}

export default function EContractOTPAuthScreen() {
  const tokenData = store.getState()?.tokenReducer?.valueAppToken;
  const [otpValues, setOtpValue] = useState(new Array(6).fill(''));
  const [isShowInfoModal, setShowInfoModal] = useState(false);
  const [isInvalidOtp, setInvalidOtp] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);
  const [time, setTime] = useState<Timer>({ min: 5, sec: 0 });
  const [isTimeout, setIsTimeout] = useState(false);
  const [intervalIds, setIntervalIds] = useState<number[]>([]);
  const [countTimes, setCountTimes] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [otpErrorText, setOtpErrorText] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    countdownTimer(5, 0, setTime, intervalIds, setIntervalIds);
    return () => {
      clearAllInterval(intervalIds);
      setCurrentPosition(0);
    };
  }, []);

  //Check expire otp, user type wrong 3 times or phone request over 5 times
  useEffect(() => {
    checkOTPFailThreeTimes(
      time,
      setIsTimeout,
      inputEl,
      intervalIds,
      setOtpErrorText
    );
  }, [time.min, time.sec]);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  // // Detect invalid otp
  useEffect(() => {
    detectInvalidOTP(
      otpValues,
      countTimes,
      history,
      setCurrentPosition,
      setInvalidOtp,
      setTime,
      setCountTimes,
      tokenData.merchantAccountId,
      tokenData.phoneNumber,
      tokenData.identityCard,
      setOtpErrorText
    );
  }, [otpValues]);

  // When user fill enough 6 number to otp, call api to verify

  function handleChange(e: any) {
    if (currentPosition === 6) {
      inputEl.current?.blur();
      return;
    }
    const result = onChangeOTP(
      otpValues,
      currentPosition,
      e,
      setCurrentPosition
    );
    setOtpValue(result);
  }

  function handleDelete(e: KeyboardEvent) {
    onDeleteOTP(
      otpValues,
      e,
      currentPosition,
      setOtpValue,
      setInvalidOtp,
      setCurrentPosition
    );
  }

  async function resendOtp() {
    const payload: any = {
      phoneNumber: tokenData.phoneNumber,
      fullName: 'test',
      email: 'abc@gmail.com',
      identityCard: tokenData.identityCard,
      merchantId: 1,
      type: 'ON_BOARDING'
    };
    const res: any = await AuthenApi.register(payload);
    if (res.status === ResponseCode.SUCCESS && isTimeout) {
      setTime({ min: 5, sec: 0 });
      setShowInfoModal(true);
      countdownTimer(5, 0, setTime, intervalIds, setIntervalIds);
      setIsTimeout(false);
      setOtpValue(new Array(6).fill(''));
      setCurrentPosition(0);
      setInvalidOtp(false);
      inputEl.current?.focus();
    }
  }

  return (
    <>
      {isInvalidOtp && (
        <WarningMessage
          styleWrapper={{
            zIndex: 100,
            position: 'relative',
            marginTop: sizes._55sdp
          }}
          content={otpErrorText}
        />
      )}
      <div
        style={{
          ...styles.wrapper,
          paddingTop: `${getPaddingStyle(isInvalidOtp)}px`
        }}
      >
        <BaseText
          content={strings.signContract.inputAuthCode}
          textContainerStyle={styles.inputCode}
        />
        <div style={styles.phoneWrapper}>
          <img src={images.phone} />
          <BaseText
            content={`******${tokenData.phoneNumber.slice(-3)}`}
            textContainerStyle={styles.phone}
          />
        </div>
        <BaseText
          content={strings.productLoanInfo.otpContent}
          textContainerStyle={styles.plsInput}
        />
        <div
          style={styles.otpWrapper}
          onClick={() => (isTimeout ? null : inputEl.current?.focus())}
        >
          {otpValues.map((v, index) => (
            <div
              key={uuidv4()}
              style={{
                ...styles.codeWrapper,
                border: `1px solid ${getOTPBorderColor(index, currentPosition)}`
              }}
            >
              <BaseText content={v} textContainerStyle={styles.code} />
            </div>
          ))}
        </div>
        <input
          type="tel"
          onChange={(e) => handleChange(e)}
          ref={inputEl}
          style={{ opacity: 0 }}
          value=""
          onKeyDown={(e) => handleDelete(e)}
        />
        <div style={styles.codeDuration}>
          <p>
            <BaseText
              content={strings.authen.authCodeDuration}
              textContainerStyle={styles.authCodeDuration}
            />
            <BaseText
              content={` ${time?.min < 10 ? '0' : ''}${time?.min} : ${
                time?.sec < 10 ? '0' : ''
              }${time?.sec}`}
              textContainerStyle={{
                color: isTimeout ? colors.redFF0000 : colors.blue0A73F0,
                fontSize: sizes._15sdp
              }}
            />
          </p>
          <BaseText
            content={strings.authen.resend}
            textContainerStyle={{
              fontSize: sizes._15sdp,
              color: getResendColor(isTimeout),
              fontWeight: '700'
            }}
            handleClick={() => {
              if (checkResendOtp(time)) {
                resendOtp();
              }
            }}
          />
        </div>
      </div>
      {isShowInfoModal ? (
        <InfoModal
          handleButton1={() => setShowInfoModal(false)}
          isConfirm
          title={strings.signContract.resent}
          content={strings.productLoanInfo.otpPopupContent}
        />
      ) : null}
    </>
  );
}

const styles = {
  wrapper: {
    width: '100%',
    // marginTop: sizes._70sdp,
    padding: `${sizes._55sdp}px ${sizes._35sdp}px`
  },
  otpWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: sizes._18sdp
  },
  codeWrapper: {
    width: sizes._46sdp,
    height: sizes._50sdp,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${colors.border9EAABB}`,
    borderRadius: sizes._10sdp
  },
  code: {
    color: colors.originalBlack,
    fontSize: sizes._24sdp
  },
  codeDuration: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputCode: {
    fontSize: sizes._28sdp,
    fontWeight: 700,
    color: colors.black0A2851
  },
  phoneWrapper: {
    width: sizes._180sdp,
    background: colors.phoneBg,
    padding: `${sizes._8sdp}px ${sizes._22sdp}px`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: sizes._23sdp,
    marginTop: sizes._16sdp
  },
  phone: {
    fontSize: sizes._17sdp,
    fontWeight: 700,
    color: colors.black0A2851
  },
  plsInput: {
    fontSize: sizes._16sdp,
    color: colors.grey6C7E98,
    marginTop: sizes._16sdp,
    display: 'block'
  },
  authCodeDuration: {
    color: colors.grey6B7D97,
    fontSize: sizes._15sdp
  }
};
