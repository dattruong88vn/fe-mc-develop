import { store } from 'store/store';
import ActionKeys from './ActionKeys';

export const saveCustomerInfo = (value: any) => {
  store.dispatch({
    type: ActionKeys.AUTH.CUSTOMERINFO,
    data: value
  });
};
