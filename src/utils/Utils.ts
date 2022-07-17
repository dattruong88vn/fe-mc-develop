import {
  GMOBILE,
  MOBI,
  SFONE,
  VIETNAM_MOBILE,
  VIETTEL,
  VINA
} from 'configs/Constants';
import _ from 'lodash';
import { escapeRegExp } from 'lodash';
import { CSSProperties } from 'react';

export type TYPE_MONEY = '100,000.00' | '100.000,00' | 'DOT' | 'COMMA';

export function getCroppedImg(
  sourceImage: any,
  cropConfig: any,
  fileName: any
) {
  const canvas = document.createElement('canvas');
  const scaleX = sourceImage.naturalWidth / sourceImage.width;
  const scaleY = sourceImage.naturalHeight / sourceImage.height;
  canvas.width = Math.ceil(cropConfig.width * scaleX);
  canvas.height = Math.ceil(cropConfig.height * scaleY);
  const ctx = canvas.getContext('2d');

  // ctx!.imageSmoothingQuality = 'high';
  // ctx!.imageSmoothingEnabled = false;
  ctx?.drawImage(
    sourceImage,
    cropConfig.x * scaleX,
    cropConfig.y * scaleY,
    cropConfig.width * scaleX,
    cropConfig.height * scaleY,
    0,
    0,
    cropConfig.width * scaleX,
    cropConfig.height * scaleY
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      async (blob) => {
        // returning an error
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }

        const file = new File([blob], fileName, { type: 'image/jpeg' });
        // creating a Object URL representing the Blob object given
        const croppedImageUrl = window.URL.createObjectURL(file);

        const data = {
          file,
          croppedImageUrl
        };

        resolve(data);
      },
      'image/jpeg',
      1
    );
  });
}

export function convertImageBase64(url: any, name: string, type?: string) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        const file = new File([blob], name, {
          type: type ?? 'image/jpeg'
        });
        resolve(file);
      });
  });
}

export const getMoneyFormat = (
  str: string,
  typeMoneyFormat: TYPE_MONEY = '100,000.00',
  autoRound = true
): string => {
  let strTemp = str;
  if (autoRound) {
    strTemp = String(strTemp).replace(/[^\d-.]/g, '');
    const roundedStr: number = Math.round(Number(strTemp));
    strTemp = roundedStr.toString();
  }
  return formatDotMoney(strTemp, typeMoneyFormat);
};

const formatDotMoney = (str: string, typeMoneyFormat: TYPE_MONEY): string => {
  try {
    let thousandsSeparator = '';
    let decimalSeparator = '.';

    const temp = String(str).split('.');

    if (typeMoneyFormat == '100.000,00' || typeMoneyFormat == 'DOT') {
      thousandsSeparator = '.';
      decimalSeparator = ',';
    } else if (typeMoneyFormat == '100,000.00' || typeMoneyFormat == 'COMMA') {
      thousandsSeparator = ',';
      decimalSeparator = '.';
    }

    if (temp.length < 2) {
      const value = String(str)
        .replace(/[^\d-]/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
      return value.length > 0 ? value : '0';
    }
    if (temp[1].length > 0) {
      return (
        temp[0]
          .replace(/[^\d-]/g, '')
          .replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator) +
        decimalSeparator +
        temp[1]
      );
    }
    return temp[0]
      .replace(/[^\d-]/g, '')
      .replace(/\B(?=(\\d{3})+(?!\d))/g, thousandsSeparator);
  } catch (error) {
    console.log(error);
    return str;
  }
};

export const replaceAll = (str: string, find: string, replace: string) =>
  str.replace(new RegExp(escapeRegExp(find), 'g'), replace);

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validatePhone = (phone: string) => {
  const re = /^[+]?[(]?[0-9]{4,5}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,5}$/im;
  return re.test(phone);
};

export function removeVietnameseTones(str: string) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' '
  );
  return str;
}

export interface StylesDictionary {
  [Key: string]: CSSProperties;
}

export const validateFirstThreePhoneNumber = (phoneNumber: string) => {
  const agency = _.concat(VIETTEL, VINA, MOBI, VIETNAM_MOBILE, GMOBILE, SFONE);
  const first3 = phoneNumber.substring(0, 3);
  return agency.includes(first3);
};

export const getDataWithEmptyString = (data: string | undefined) => {
  return data ? data : '';
};
