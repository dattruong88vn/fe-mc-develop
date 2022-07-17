import { DataEkyc } from 'apis/subs/ekyc/EkycResponse';
import { ActionData } from 'store/actions/ActionData';
import ActionKeys from 'store/actions/ActionKeys';

const indentityData = {
  installmentLoanId: '',
  indentityData: {}
};
export const identityReducer = (
  state = indentityData,
  action: ActionData<DataEkyc>
) => {
  switch (action.type) {
    case ActionKeys.IDENTITY.DATA_IDENTITY:
      return {
        ...state,
        installmentLoanId: action.data.installmentLoanId,
        indentityData: action.data
      };

    default:
      return state;
  }
};
