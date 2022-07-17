import { message } from 'antd';
import vi from 'assets/languages/vi';
import Axios from 'axios';
import { hideLoading, showLoading } from 'components/spinnerLoading';
import strings from 'configs/res/strings';
import { SCREENS } from 'routes/ScreensName';
import { store } from 'store/store';
import {
  checkStatus,
  getRequestMethod,
  isExistedFormData,
  isExistedToken,
  returnDataOrUndefined,
  returnStatusOrCode,
  returnUrlRequest
} from 'utils/Containers/ApiContainer';
import { BaseResponse } from './BaseResponse';
import ResponseCode from './ResponseCode';

export const RequestMethod = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT'
};

export const TIMEOUT_MESSAGE = 'TIMEOUT';
const TIMEOUT = 30 * 1000; //30 SECONDS

const axiosInit = Axios.create({
  timeout: TIMEOUT
});

const { CancelToken } = Axios;

class ApiClient {
  // Map lưu lại những request cần cancel trước khi thực hiện request mới
  mapRequestCancel: Map<string, any> = new Map();

  static instance: any;

  constructor(_instance: any) {
    if (ApiClient.instance) {
      return ApiClient.instance;
    }
    ApiClient.instance = _instance;
  }

  /**
   * Main method used to fetch data from service
   * @param method
   * @param url
   * @param params
   * @param isShowLoading
   * @param ignoreURLBase
   *        true nếu đường link không cộng BASE_URL ở đầu, false ngược lại
   * @param isFormData
   * @param ignoreHandleCommonError
   *        true nếu muốn request bỏ qua logic xử lý các mã lỗi chung như 401, 504, ...
   * @returns
   **/
  ignoreHandleCommonError = false;

  async request<T>(
    method: any,
    url: string,
    params?: any,
    isShowLoading?: boolean,
    isFormData?: boolean,
    ignoreURLBase?: boolean,
    ignoreHandleCommonError?: boolean
  ) {
    !!isShowLoading && showLoading();
    // Checking network connectivity before call API
    if (!navigator.onLine) {
      message.error(vi.errors.networkFail);
      const response: BaseResponse<T> = {
        data: {} as T
      };
      response.status = ResponseCode.NOT_INTERNET;
      hideLoading();
      return response;
    }
    const requestInterceptor = Axios.interceptors.request.use(
      (config: any) => {
        const configTemp = config;
        configTemp.cancelToken = new CancelToken((cancel) => {
          this.mapRequestCancel.set(url, cancel);
        });
        const params = store.getState()?.tokenReducer?.valueAppToken;
        isExistedToken(params, configTemp);
        isExistedFormData(isFormData, configTemp);
        return configTemp;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = Axios.interceptors.response.use(
      (response) => {
        hideLoading();
        return response;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );

    const urlRequest = returnUrlRequest(ignoreURLBase, url);
    console.log(`=======> REQUEST || ${urlRequest} : \n`, params);
    console.log('params', params);
    let request;
    // eslint-disable-next-line prefer-const
    request = getRequestMethod(method, urlRequest, params);

    return Promise.race([
      request,
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error(TIMEOUT_MESSAGE));
        }, TIMEOUT);
      })
    ])
      .then((res: any) => {
        console.log(`=======> RESPONSE || ${urlRequest}`, res.data);
        const response: BaseResponse<T> = {
          data: {} as T
        };

        response.status = res.status;
        response.data = res.data;
        console.log('response: ', response);
        return response;
      })
      .catch(async (error) => {
        console.log(`=======> ERROR || ${urlRequest} `, error);
        hideLoading();

        const response: BaseResponse<T> = {
          data: error?.response?.data?.data || ({} as T)
        };

        if (error.message === TIMEOUT_MESSAGE) {
          message.warning(strings.errors.timeOut);
          return response;
        }
        response.error = returnDataOrUndefined(error);
        response.status = returnStatusOrCode(error);
        // ||
        // Number(ResponseCode.UNKNOW);
        response.message = `${error?.response?.data?.message}`;

        if (error.response.status == ResponseCode.UNAUTHORIZED) {
          // xử lý hết hạn token

          if (
            SCREENS.SESSION_EXPIRED_SCREEN.indexOf(window.location.pathname) < 0
          ) {
            window.location.href = SCREENS.SESSION_EXPIRED_SCREEN;
          }
          return response;
        }

        if (checkStatus(response)) {
          message.warning(response.message);
        }
        return response;
      })
      .finally(() => {
        Axios.interceptors.request.eject(requestInterceptor);
        Axios.interceptors.response.eject(responseInterceptor);
      });
  }

  /**
   *
   * @param url
   * @param body
   * @param isAddheaders
   * @param progressCallback
   * @param isShowLoading
   *        true nếu muốn hiển thị loading dialog, false ngược lại
   * @param textLoading
   *        Text hiển thị cùng icon loading khi tải file lên
   * @param ignoreURLBase
   *        true nếu đường link không cộng BASE_URL ở đầu, false ngược lại
   * @param ignoreHideLoading
   *        true nếu muốn không ẩn loading dialog khi request trả về response, false ngược lại
   * @returns
   */
  // async requestUploadFiles<T>(
  //   url: string,
  //   body: any,
  //   progressCallback?: (number: number) => void,
  //   isShowLoading?: boolean,
  //   textLoading?: string,
  //   ignoreURLBase?: boolean,
  //   ignoreHideLoading?: boolean
  // ) {
  //   const urlRequest = returnUrlRequest(ignoreURLBase, url);
  //   console.log(`=======> URL: ${urlRequest}`);
  //   console.log(`=======> PARAMS: ${JSON.stringify(body)}`);
  //   isShowLoading != null && isShowLoading == true && showLoading();
  //   const params = store.getState()?.tokenReducer?.valueAppToken;
  //   return axiosInit
  //     .post(urlRequest, body, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${params.token}`,
  //         'X-Current-User': params.username,
  //         'X-Sign': params.sign
  //       },
  //       onUploadProgress: (data) => {
  //         const percent = Math.round((100 * data.loaded) / data.total);
  //         if (progressCallback) {
  //           progressCallback(percent);
  //         }
  //       }
  //     })
  //     .then((res: any) => {
  //       console.log(`=======> RESPONSE || ${urlRequest}`, res.data);
  //       const response: BaseResponse<T> = {
  //         data: {} as T
  //       };

  //       response.status = res.status;
  //       response.data = res.data;
  //       return response;
  //     })
  //     .catch(async (error) => {
  //       console.log(`=======> ERROR || ${urlRequest} `, error.response);
  //       hideLoading();

  //       const response: BaseResponse<T> = {
  //         data: error?.response?.data?.data || ({} as T)
  //       };

  //       if (error.message === TIMEOUT_MESSAGE) {
  //         message.warning(strings.errors.timeOut);
  //         return response;
  //       }
  //       response.error = returnDataOrUndefined(error);
  //       response.status = returnStatusOrCode(error);
  //       response.message = `${error?.response?.data?.message}`;

  //       if (error.response.status == ResponseCode.UNAUTHORIZED) {
  //         // xử lý hết hạn token
  //         if (
  //           SCREENS.SESSION_EXPIRED_SCREEN.indexOf(window.location.pathname) < 0
  //         ) {
  //           window.location.href = SCREENS.SESSION_EXPIRED_SCREEN;
  //         }
  //       }

  //       return response;
  //     });
  // }
}

const Api = new ApiClient(axiosInit);
export default Api;
