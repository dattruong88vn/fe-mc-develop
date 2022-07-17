import vi from 'assets/languages/vi';
import BaseButton from 'components/BaseButton';
import BaseInput from 'components/BaseInput';
import BaseText from 'components/BaseText';
import Timeline from 'components/TimeLine';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { useEffect, useRef, useState } from 'react';
import { store } from 'store/store';
import { validateData } from 'utils/Containers/AuthenticationContainer';
import AuthenApi from 'apis/subs/authen/AuthApi';
import ResponseCode from 'apis/ResponseCode';
import { getTokenData } from 'store/actions/TokenAction';
import { useHistory } from 'react-router-dom';
import { SCREENS } from 'routes/ScreensName';
export interface RequestBody {
  phoneNumber: string;
  fullName: string | null;
  email: string | null;
  identityCard: string | null;
  merchantId: number;
  type: string;
  urlStepOnboarding: string;
}

declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}

export default function AuthenticationScreen() {
  const history = useHistory();
  const refNumber = useRef<HTMLInputElement>(null);
  const tokenData = store.getState()?.tokenReducer?.valueAppToken;
  const [phoneNumber, setPhoneNumber] = useState(tokenData.phoneNumber);
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const [identityNumber, setIdentityNumber] = useState(tokenData.identityCard);
  const [identificationError, setIdentificationError] = useState('');
  const [errorContentSrv, setErrorContentSrv] = useState('');

  const [isValidate, setIsvalidate] = useState(false);

  useEffect(() => {
    if (errorContentSrv) {
      setTimeout(() => {
        setErrorContentSrv('');
      }, 3000);
    }
  }, [errorContentSrv]);

  useEffect(() => {
    if (isValidate) {
      validateData(
        phoneNumber,
        setPhoneNumberError,
        identityNumber,
        setIdentificationError
      );
    }
  }, [phoneNumber, identityNumber]);

  useEffect(() => {
    refNumber.current?.focus();
  }, []);

  async function handleRegister() {
    setIsvalidate(true);
    if (
      validateData(
        phoneNumber,
        setPhoneNumberError,
        identityNumber,
        setIdentificationError
      )
    )
      return;
    const body: any = {
      phoneNumber: phoneNumber,
      identityCard: identityNumber,
      merchantId: 1,
      type: 'ON_BOARDING'
    };

    const res: any = await AuthenApi.register(body);
    if (res.status === ResponseCode.SUCCESS) {
      getTokenData({
        ...tokenData,
        merchantAccountId: res.data.data,
        phoneNumber: phoneNumber,
        identityCard: identityNumber
      });
      history.replace(SCREENS.ECONTRACTOTPAUTH);
    } else setErrorContentSrv(res.message);
  }
  return (
    <>
      <Timeline step={1} containerStyle={{ paddingTop: sizes._24sdp }} />
      <div style={styles.wrapper}>
        <BaseText
          content={`${vi.authen.welcome}, Vũ Trung Hiếu`}
          textContainerStyle={styles.title}
        />
        <BaseText
          content={vi.authen.purpose}
          textContainerStyle={styles.purpose}
        />
        <BaseText
          content={vi.authen.phoneNumber}
          textContainerStyle={styles.phoneNumber}
        />
        <BaseInput
          refInput={refNumber}
          value={phoneNumber}
          handleChange={(value) => {
            const re = /^[0-9\b]+$/;
            if (value === '' || re.test(value)) {
              setPhoneNumber(value);
            }
          }}
          type="tel"
          maxLength={10}
          textError={phoneNumberError}
          placeholder={vi.authen.phoneNumberPlaceHolder}
          // disabled={true}
          className="base-input-register"
          isClosed={() => {
            setPhoneNumber('');
          }}
          rightIconImg={images.iconBack}
        />

        <BaseText
          content={vi.authen.identityNumber}
          textContainerStyle={styles.phoneNumber}
        />
        <BaseInput
          value={identityNumber}
          handleChange={(value) => {
            const re = /^[0-9\b]+$/;
            if (value === '' || re.test(value)) {
              setIdentityNumber(value);
            }
          }}
          type="tel"
          maxLength={12}
          textError={identificationError}
          // disabled={true}
          placeholder={vi.authen.identityNumberPlaceHolder}
          leftIcon={images.identityIcon}
          className="base-input-register"
        />

        <BaseButton
          title={vi.authen.continueAuth}
          onClick={() => handleRegister()}
          buttonContainer={styles.buttonContainer}
          textContainerStyle={styles.textContainerStyle}
          disabled={errorContentSrv !== ''}
        />
      </div>
    </>
  );
}

const styles = {
  wrapper: {
    width: '100%',
    padding: `0 ${sizes._28sdp}px`,
    marginTop: sizes._22sdp
  },
  title: {
    display: 'block',
    fontSize: sizes._24sdp,
    color: colors.black0A2851
  },
  purpose: {
    display: 'block',
    fontSize: sizes._16sdp,
    color: colors.black0A2851,
    opacity: 0.5
  },
  phoneNumber: {
    display: 'block',
    fontSize: sizes._15sdp,
    color: colors.grey6C7E98,
    marginTop: sizes._28sdp,
    marginBottom: sizes._4sdp
  },
  buttonContainer: {
    marginTop: sizes._16sdp,
    width: '100%',
    height: sizes._60sdp
  },
  textContainerStyle: {
    color: colors.white,
    fontWeight: '700',
    fontSize: sizes._18sdp
  }
};
