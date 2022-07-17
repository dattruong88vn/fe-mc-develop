import ResponseCode from 'apis/ResponseCode';
import AuthenApi from 'apis/subs/authen/AuthApi';
import vi from 'assets/languages/vi';
import ModalWrapper from 'components/modals/ModalWrapper';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { StylesDictionary } from 'utils/Utils';
import BaseText from '../BaseText';
import {
  checkOTPFailThreeTimes,
  clearAllInterval,
  countdownTimer,
  detectInvalidOTP,
  onChangeOTP,
  onDeleteOTP
} from 'utils/Containers/EContractOTPAuthContainer';
import strings from 'configs/res/strings';

interface Timer {
  min: number;
  sec: number;
}

interface OTPModalProps {
  phoneNumber: string;
  handleCloseModal: () => void;
  merchantAccountId: number;
  identityNumber: string;
}

export interface VerifyData {
  urlStepOnboarding: string;
  phoneNumber: string;
  merchantAccountId: number;
  code: string;
  type: string;
}

export default function OTPModal(props: OTPModalProps) {
  const { phoneNumber, handleCloseModal, merchantAccountId, identityNumber } =
    props;
  const [otpValues, setOtpValue] = useState(new Array(6).fill(''));
  const [time, setTime] = useState<Timer>({ min: 5, sec: 0 });
  const [isTimeout, setIsTimeout] = useState(false);
  const [intervalIds, setIntervalIds] = useState<number[]>([]);
  const inputEl = useRef<HTMLInputElement>(null);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [isInvalidOtp, setInvalidOtp] = useState(false);
  const [isSlide, setSlide] = useState(false);
  const [countTimes, setCountTimes] = useState<number>(0);

  const history = useHistory();

  useEffect(() => {
    countdownTimer(5, 0, setTime, intervalIds, setIntervalIds);
    return () => {
      clearAllInterval(intervalIds);
      setCurrentPosition(0);
    };
  }, []);

  //Check expire otp, user type wrong 3 times or phone request over 5 times
  // useEffect(() => {
  //   checkOTPFailThreeTimes(time, setIsTimeout, inputEl, intervalIds);
  // }, [time.min, time.sec]);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  // // Detect invalid otp
  // useEffect(() => {
  //   detectInvalidOTP(
  //     otpValues,
  //     countTimes,
  //     history,
  //     setCurrentPosition,
  //     setInvalidOtp,
  //     setTime,
  //     setCountTimes,
  //     merchantAccountId,
  //     phoneNumber,
  //     identityNumber
  //   );
  // }, [otpValues]);

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

  function _handleCloseModal() {
    setSlide(true);
    const timeout = setTimeout(() => {
      handleCloseModal();
      clearTimeout(timeout);
    }, 500);
  }

  async function resendOtp() {
    const payload: any = {
      phoneNumber: phoneNumber,
      fullName: 'test',
      email: 'abc@gmail.com',
      identityCard: identityNumber,
      merchantId: 1,
      type: 'ON_BOARDING'
    };
    const res: any = await AuthenApi.register(payload);
    if (res.status === ResponseCode.SUCCESS && isTimeout) {
      setTime({ min: 5, sec: 0 });
      countdownTimer(5, 0, setTime, intervalIds, setIntervalIds);
      setIsTimeout(false);
      setOtpValue(new Array(6).fill(''));
      setCurrentPosition(0);
      setInvalidOtp(false);
      inputEl.current?.focus();
    }
  }

  return (
    // <ModalWrapper
    //   containerStyle={{
    //     background: colors.white,
    //     paddingBottom: sizes._60sdp
    //   }}
    //   isSlide={isSlide}
    // >
    //   <div>
    //     <div style={styles.header}>
    //       <div />
    //       <BaseText
    //         content={vi.authen.authCode}
    //         textContainerStyle={styles.authCode}
    //       />
    //       <img src={images.closeModal} onClick={_handleCloseModal} />
    //     </div>
    //     <div style={styles.content}>
    //       <BaseText
    //         content={`${vi.authen.msgSent} ******${phoneNumber.slice(-4)}`}
    //         textContainerStyle={styles.msgSent}
    //       />
    //       <BaseText
    //         content={
    //           isInvalidOtp
    //             ? strings.signContract.invalidOtp
    //             : vi.authen.authCode
    //         }
    //         textContainerStyle={{
    //           ...styles.blueAuthCode,
    //           color: isInvalidOtp ? colors.redFF0000 : colors.blue0A73F0
    //         }}
    //       />
    //       <div
    //         style={styles.otpWrapper}
    //         onClick={() => (isTimeout ? null : inputEl.current?.focus())}
    //       >
    //         {otpValues.map((v, index) => (
    //           <div
    //             // eslint-disable-next-line react/no-array-index-key
    //             key={index}
    //             style={{
    //               ...styles.codeWrapper,
    //               borderBottom: `1px solid ${
    //                 isInvalidOtp
    //                   ? colors.redFF0000
    //                   : index === 0 || index < currentPosition
    //                   ? colors.mainBlue
    //                   : colors.blackDefaultTextBlur()
    //               }`
    //             }}
    //           >
    //             <BaseText content={v} textContainerStyle={styles.code} />
    //           </div>
    //         ))}
    //       </div>
    //       <input
    //         type="tel"
    //         onChange={(e) => handleChange(e)}
    //         ref={inputEl}
    //         style={{ opacity: 0 }}
    //         value=""
    //         onKeyDown={(e) => handleDelete(e)}
    //       />
    //       <div style={styles.codeDuration}>
    //         <p>
    //           <BaseText
    //             content={vi.authen.authCodeDuration}
    //             textContainerStyle={{
    //               color: colors.grey6B7D97,
    //               fontSize: sizes._15sdp
    //             }}
    //           />
    //           <BaseText
    //             content={` ${time?.min < 10 ? '0' : ''}${time?.min} : ${
    //               time?.sec < 10 ? '0' : ''
    //             }${time?.sec}`}
    //             textContainerStyle={{
    //               color: isTimeout ? colors.redFF0000 : colors.blue0A73F0,
    //               fontSize: sizes._15sdp
    //             }}
    //           />
    //         </p>
    //         <BaseText
    //           content={vi.authen.resend}
    //           textContainerStyle={{
    //             fontSize: sizes._15sdp,
    //             color: isTimeout ? colors.blue0A73F0 : colors.border9EAABB,
    //             fontWeight: '700'
    //           }}
    //           handleClick={() => {
    //             if (time && time?.min === 0 && time?.sec === 0) {
    //               resendOtp();
    //             }
    //           }}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </ModalWrapper>
    <div></div>
  );
}

const styles: StylesDictionary = {
  header: {
    width: '100%',
    height: sizes._50sdp,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: colors.greyF6F7F9,
    padding: `0 ${sizes._18sdp}px`
  },
  content: {
    width: '100%',
    padding: `0 ${sizes._30sdp}px`
  },
  authCode: {
    fontWeight: '700',
    fontSize: sizes._17sdp,
    color: colors.black0A2851
  },
  msgSent: {
    display: 'block',
    marginTop: sizes._32sdp,
    color: colors.grey6C7E98,
    fontSize: sizes._17sdp,
    textAlign: 'center'
  },
  blueAuthCode: {
    display: 'block',
    marginTop: sizes._35sdp,
    fontSize: sizes._15sdp,
    textAlign: 'center'
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
    height: sizes._48sdp,
    paddingBottom: sizes._10sdp,
    display: 'flex',
    justifyContent: 'center'
  },
  code: {
    color: colors.originalBlack,
    fontSize: sizes._24sdp
  },
  codeDuration: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  }
};
