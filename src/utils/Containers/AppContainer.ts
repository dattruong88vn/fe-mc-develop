import { message } from 'antd';
import { BaseResponse } from 'apis/BaseResponse';
import ResponseCode from 'apis/ResponseCode';
import AuthenApi from 'apis/subs/authen/AuthApi';
import UAParser from 'ua-parser-js';

export const checkIsMobile = () => {
  const parser = new UAParser();
  return /iPhone|Android|Mobile|ipad|tablet/i.test(parser.getResult().ua);
};

const get9PayUA = () => {
  const parser = new UAParser();
  return '9Pay-WebView'.toLowerCase() === parser.getResult().ua.toLowerCase()
    ? true
    : false;
};

export function GetQueryStringByParameter(name: string) {
  // eslint-disable-next-line no-useless-escape
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
  if (results) {
    return results.length > 0 ? results[0].substring(6) : null;
  }
}

export const handleGetDataFromApp = async (
  // setTimeoutTime: (c: any) => void,
  setIsDone: (c: boolean) => void,
  getTokenData: (c: any) => void,
  setIsShowDialog: (c: boolean) => void
) => {
  // if (checkIsMobile()) {
  if (get9PayUA()) {
    const params = GetQueryStringByParameter('sign');
    if (params) {
      const res: any = await AuthenApi.getAccesToken(params);
      if (res.status === ResponseCode.SUCCESS) {
        // const timeOutTimes = 1000 * 60 * res?.data?.data?.sessionTimeOut;
        const data = {
          token: res.data.data?.token,
          username: 'Tôi tên là',
          loanProfileStatus: res.data.data?.loanProfileStatus,
          caseId: res.data.data?.caseId,
          sign: params,
          phoneNumber: res.data.data?.phoneNumber,
          identityCard: res.data.data?.identityCard
        };
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage('BNPL_REQUEST_CAMERA_TO_EKYC');
        }
        window.postMessage('BNPL_REQUEST_CAMERA_TO_EKYC');
        // setTimeoutTime(timeOutTimes);
        setIsDone(true);
        getTokenData(data);
      } else {
        message.warn(res.message);
        getTokenData({
          token: '',
          username: '',
          loanProfileStatus: '',
          caseId: '',
          sign: ''
        });
      }
    }
  }
  // } else {
  //   setIsShowDialog(true);
  // }
};

export const handleGetSignLogin = async (
  // setTimeoutTime: (c: any) => void,
  setIsDone: (c: boolean) => void,
  getTokenData: (c: any) => void
) => {
  const body = {
    clientId: '9pay.bnpl-service',
    clientSecret:
      'CPoO5X9CXKjUotgBRsd90Q6vs/1A4sHT/IipI2/7/LBMHDi3oSo5/WB1Tf//LM6oCoIjRM6yt4dJt+zUAEcfPtZQMbVcWMOPHxKQV+LzGIBkeSqaJc/GEugO1wcUsInkQ5/c+8gBNfhLWUMdI+BNwnkTnmnLdv53uQdFNPDwdYgnFOX8qVa2mtxVL0zPhvFpqKzN1P+/RBTQpLdezft5T3X3W5CVm8obL+4FVWEEwrUs8jr42lTiT4dlAaf1MJOdy+ZCFeHMBgwVQfvCUbrXkfg1MVb+xQY0/NJR44uAvCRlx1tTGCuBjNKg+Px8bKvaTwfbT+zoLpTvgROTtUxH/w==',
    deviceId: 'dgp.dgp0012',
    accountId: '34543534'
  };
  const res = await AuthenApi.getSignApp<BaseResponse<any>>(body);
  if (res.status === ResponseCode.SUCCESS) {
    const keyQuery = '?sign=';
    const params = res?.data?.data.substring(
      res?.data?.data.indexOf(keyQuery) + keyQuery.length
    );
    const value: any = await AuthenApi.getAccesToken(params);
    if (value.status === ResponseCode.SUCCESS) {
      // const timeOutTimes = 1000 * 60 * value?.data?.data?.sessionTimeOut;
      const data = {
        token: value.data.data?.token,
        username: 'Tôi tên là',
        loanProfileStatus: '',
        caseId: value.data.data?.caseId,
        sign: params,
        phoneNumber: value.data.data?.phoneNumber,
        identityCard: value.data.data?.identityCard
      };
      // setTimeoutTime(timeOutTimes);
      setIsDone(true);
      getTokenData(data);
    } else {
      message.warn(res.message);
      getTokenData({
        token: '',
        username: '',
        loanProfileStatus: '',
        caseId: '',
        sign: ''
      });
    }
  }
};
