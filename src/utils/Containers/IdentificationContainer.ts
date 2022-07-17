import { BaseResponse } from 'apis/BaseResponse';
import ResponseCode from 'apis/ResponseCode';
import EkycApi from 'apis/subs/ekyc/EkycApi';
import { OCRResponse } from 'apis/subs/ekyc/EkycResponse';
import colors from 'configs/res/colors';
import { SCREENS } from 'routes/ScreensName';

export const captureImage = async (
  setIsFrontCapture: (c: boolean) => void,
  isFrontCapture: any,
  setFrontFile: (c: any) => void,
  resultFile: any,
  setSrcImg: (c: string) => void,
  setResult: (c: any) => void,
  setResultFile: (c: any) => void,
  frontFile: any,
  saveOcrData: any,
  history: any,
  setMessageError: (c: string) => void,
  setIsResultFail: (c: any) => void,
  phoneNumber: string,
  merchantAccountId: string
) => {
  try {
    setIsFrontCapture(true);
    if (!isFrontCapture) {
      setFrontFile(resultFile);
      setSrcImg('');
      setResult(null);
      setResultFile(null);
    } else {
      const data = new FormData();
      data.append('front', frontFile);
      data.append('back', resultFile);

      data.append('phoneNumber', phoneNumber);
      data.append('merchantAccountId', merchantAccountId);
      data.append('urlStepOnboarding', 'https://uat-bnpl.mcredit.com.vn');
      data.append('mode', 'OCR');
      data.append('type', 'WEB');
      const res: BaseResponse<any> = await EkycApi.checkOcr(data);
      if (res.status === ResponseCode.SUCCESS) {
        saveOcrData(res.data?.data?.data);
        history.replace({
          pathname: SCREENS.EKYC_SCREEN
        });
      } else {
        setMessageError(
          res.data.data.message ??
            'Vui lòng thử lại hoặc thay thế bằng giấy tờ tuỳ thân khác'
        );
        setIsResultFail(true);
      }
    }
  } catch (error) {
    console.log('error: ', error);
    setMessageError(
      'Vui lòng thử lại hoặc thay thế bằng giấy tờ tuỳ thân khác'
    );
    setIsResultFail(true);
  }
};

export const getExportFileName = (isFrontCapture: boolean) => {
  return isFrontCapture ? 'back.jpg' : 'front.jpg';
};

export const getBacksideColor = (isFrontCapture: boolean) => {
  return isFrontCapture ? colors.black0A2851 : colors.border9EAABB;
};

export const onCancelImg = (
  isFrontCapture: boolean,
  onCancelBack: any,
  onCancelFront: any
) => {
  return isFrontCapture ? onCancelBack : onCancelFront;
};
