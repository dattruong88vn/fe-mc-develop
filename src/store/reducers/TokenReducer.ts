import { ActionData } from 'store/actions/ActionData';
import ActionKeys from 'store/actions/ActionKeys';

export interface DataInvalid {
  token: string;
  username: string;
  loanProfileStatus: string;
  caseId: string;
  sign: string;
  phoneNumber: string;
  identityCard: string;
  merchantAccountId: number;
}

const refreshTokenState = {
  valueAppToken: {
    token: '',
    username: '',
    loanProfileStatus: '',
    caseId: '',
    sign: '',
    phoneNumber: '',
    identityCard: '',
    merchantAccountId: 0
  }
};

export const tokenReducer = (
  state = refreshTokenState,
  action: ActionData<DataInvalid>
) => {
  switch (action.type) {
    case ActionKeys.TOKEN.GET_TOKEN:
      return {
        ...state,
        valueAppToken: action.data
      };

    default:
      return state;
  }
};
