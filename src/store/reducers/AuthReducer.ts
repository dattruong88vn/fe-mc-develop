import { ActionData } from 'store/actions/ActionData';
import ActionKeys from 'store/actions/ActionKeys';

export interface MerchantAccId {
  id?: any;
  phone?: any;
}

interface MerchantItem {
  merchantAccId: number;
  phoneNumber: string;
}

interface MerchantData {
  value: MerchantItem;
}

const merchantAccIdState: MerchantData = {
  value: {
    merchantAccId: 0,
    phoneNumber: ''
  }
};

export const authReducer = (
  state = merchantAccIdState,
  action: ActionData<MerchantAccId>
) => {
  switch (action.type) {
    case ActionKeys.AUTH.CUSTOMERINFO:
      return {
        ...state,
        infoCustomer: action.data
      };

    default:
      return state;
  }
};
