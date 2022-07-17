import Api, { RequestMethod } from 'apis/ApiManager';

class OTPApi {
  requestOTP<T>(body: any) {
    const url = 'api/v1/secu/cash-loan/otp/request';
    return Api.request<T>(RequestMethod.POST, url, body, true, false, false);
  }

  verifyOTP<T>(body: any) {
    const url = 'api/v1/secu/cash-loan/otp/verify';
    return Api.request<T>(RequestMethod.POST, url, body, true, false, false);
  }
}

export default new OTPApi();
