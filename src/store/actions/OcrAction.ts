import { store } from 'store/store';
import ActionKeys from './ActionKeys';

export const saveOcrData = (value: any) => {
  store.dispatch({
    type: ActionKeys.OCR.GET_OCR_DATA,
    data: value
  });
};
