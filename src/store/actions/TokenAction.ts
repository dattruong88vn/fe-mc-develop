import ActionKeys from './ActionKeys';
import { store } from 'store/store';
import { DataInvalid } from 'store/reducers/TokenReducer';

// export function getRefreshToken(data: any) {
//   console.log('token dataaaa:', data)
//   return {
//     type: ActionKeys.TOKEN.GET_REFRESH_TOKEN,
//     data
//   };
// }

export const getTokenData = (data: DataInvalid) => {
  store.dispatch({
    type: ActionKeys.TOKEN.GET_TOKEN,
    data,
  });
};
