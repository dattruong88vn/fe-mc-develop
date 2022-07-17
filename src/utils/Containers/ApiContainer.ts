import { RequestMethod } from 'apis/ApiManager';
import HostConfig from 'apis/HostConfig';
import ResponseCode from 'apis/ResponseCode';
import Axios from 'axios';

const HeaderKeys = {
  CONTENT_TYPE: 'Content-Type',
  AUTHEN: 'Authorization',
  X_AUTHEN: 'X-Authorization',
  TRANSFER_ENCODING: 'Transfer-Encoding',
  X_SYSTEM: 'x-source-system',
  X_SERVICE_ID: 'x-service-message-id',
  X_CURRENT_USER: 'X-Current-User',
  X_PHONE_NUMBER: 'X-Phone-Number',
  X_IDENTITY_CARD: 'X-Identity-Card',
  X_SIGN: 'X-Sign'
};

const HeaderValue = {
  CONTENT_TYPE1: 'application/json',
  CONTENT_TYPE2: 'application/json;charset=UTF-8',
  CONTENT_TYPE3: 'application/x-www-form-urlencoded',
  CONTENT_TYPE4: 'multipart/form-data',
  TRANSFER_ENCODING: 'chunked',
  X_SYSTEM: 'mobile_4_sales'
};

export const checkStatus = (response: any) => {
  return (
    response.status === ResponseCode.FORBIDDEN ||
    response.status === ResponseCode.NOT_FOUND ||
    response.status >= ResponseCode.INTERNAL_SERVER_ERROR
  );
};

export const isExistedToken = (params: any, configTemp: any) => {
  if (params.token) {
    configTemp.headers.Authorization = `Bearer ${params.token}`;
    configTemp.headers[HeaderKeys.X_IDENTITY_CARD] = params.identityCard;
    configTemp.headers[HeaderKeys.X_PHONE_NUMBER] = params.phoneNumber;
    configTemp.headers[HeaderKeys.X_SIGN] = params.sign;
  }
};

export const isExistedFormData = (
  isFormData: boolean | undefined,
  configTemp: any
) => {
  if (isFormData) {
    configTemp.headers[HeaderKeys.CONTENT_TYPE] = HeaderValue.CONTENT_TYPE4;
  }
};

export const getRequestMethod = (
  method: string,
  urlRequest: any,
  params: any
) => {
  if (method === RequestMethod.POST) {
    return Axios.post(urlRequest, params);
  } else if (method === RequestMethod.PUT) {
    return Axios.put(urlRequest, params);
  } else {
    return Axios.get(urlRequest, { params });
  }
};

export const returnStatusOrCode = (error: any) => {
  return Number(error?.response?.status) || Number(error?.response?.data?.code);
};

export const returnDataOrUndefined = (error: any) => {
  return error?.response?.data?.data ?? undefined;
};

export const returnUrlRequest = (ignoreURLBase: any, url: any) => {
  return ignoreURLBase ?? false ? url : HostConfig.BASE_URL + url;
};
