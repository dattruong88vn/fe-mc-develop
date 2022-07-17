import Api, { RequestMethod } from 'apis/ApiManager';

class EkycApi {
  checkOcr<T>(body: any) {
    const url = 'api/v1/secu/account/verify/ocr';
    return Api.request<T>(RequestMethod.POST, url, body, true, true, false);
  }

  checkEkyc<T>(body: any) {
    const url = 'api/v1/secu/account/verify/face';
    return Api.request<T>(RequestMethod.POST, url, body, true, true, false);
  }
}

export default new EkycApi();
