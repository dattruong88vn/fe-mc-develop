import { store } from 'store/store';
import ActionKeys from './ActionKeys';

export function saveOcrData(data: any) {
  store.dispatch({
    type: ActionKeys.IDENTITY.DATA_IDENTITY,
    data
  });
}
