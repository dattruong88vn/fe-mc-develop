import strings from 'configs/res/strings';
import { validateFirstThreePhoneNumber, validatePhone } from 'utils/Utils';

export const validatePhoneNumber = (
  phoneNumber: string,
  setPhoneNumberError: (text: string) => void
) => {
  if (phoneNumber.length === 0) {
    setPhoneNumberError(strings.authen.emptyDataErr);
    return true;
  } else if (
    !validatePhone(phoneNumber) ||
    phoneNumber.length < 10 ||
    !validateFirstThreePhoneNumber(phoneNumber)
  ) {
    setPhoneNumberError(strings.authen.phoneNumberErr);
    return true;
  }
};

export const validateIdentification = (
  identification: string,
  setIdentificationError: (text: string) => void
) => {
  if (identification.length === 0) {
    setIdentificationError(strings.authen.emptyDataErr);
    return true;
  } else if (identification.length > 0 && identification.length < 12) {
    setIdentificationError(strings.preCheck.identityCharacter);
    return true;
  }
};

export const validateData = (
  phoneNumber: string,
  setPhoneNumberError: any,
  identityNumber: string,
  setIdentificationError: any
) => {
  let errorValidate = false;
  // validate phonenumber
  if (validatePhoneNumber(phoneNumber, setPhoneNumberError)) {
    errorValidate = true;
  } else {
    setPhoneNumberError('');
  }

  // validate CCCD
  if (validateIdentification(identityNumber, setIdentificationError)) {
    errorValidate = true;
  } else {
    setIdentificationError('');
  }

  return errorValidate;
};
