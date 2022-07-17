import { DataEkyc, DataOCR } from 'apis/subs/ekyc/EkycResponse';
import { ActionData } from 'store/actions/ActionData';
import ActionKeys from 'store/actions/ActionKeys';
interface OCRFullData {
  statusEkyc?: any;
  statusCard?: any;
  crossCheck?: any;
  objectId?: string;
  cardType?: string;
  ocr: DataOCR;
  'face-matching'?: DataEkyc;
}

const ocrData = {
  ocrData: {
    ocr: {}
  }
};

export const ocrReducer = (
  state = ocrData,
  action: ActionData<OCRFullData>
) => {
  switch (action.type) {
    case ActionKeys.OCR.GET_OCR_DATA:
      console.log('action', action);
      return {
        ...state,
        ocrData: action.data
      };

    default:
      return state;
  }
};
