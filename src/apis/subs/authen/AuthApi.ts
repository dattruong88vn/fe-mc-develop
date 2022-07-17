import Api, { RequestMethod } from 'apis/ApiManager';
import { VerifyData } from 'components/modals/OTPModal';
import { RequestBody } from 'pages/auth/AuthenticationScreen';

class AuthenApi {
  login<T>(username: string, password: string) {
    const url = 'token';
    const params = {
      username,
      password
    };
    return Api.request<T>(RequestMethod.POST, url, params, true, false, true);
  }

  getListLocation<T>(url: string) {
    return Api.request<T>(RequestMethod.GET, url, null, true, false, true);
  }

  register<T>(params: any) {
    const url = 'api/v1/secu/account/create/link';
    return Api.request<T>(RequestMethod.POST, url, params, true, false, false);
  }

  verifyOtp<T>(params: VerifyData) {
    const url = 'api/v1/secu/account/phone/verify/otp';
    return Api.request<T>(RequestMethod.PUT, url, params, true, false, false);
  }

  getSignApp<T>(body: any) {
    const url = 'api/v1/auth/request/uri/webview';
    return Api.request<T>(RequestMethod.POST, url, body, true, false, false);
  }

  getAccesToken<T>(sign: string | null) {
    const url = 'api/v1/auth/check/url-invalid';
    return Api.request<T>(
      RequestMethod.POST,
      url,
      { sign },
      true,
      false,
      false
    );
  }
}

export default new AuthenApi();
