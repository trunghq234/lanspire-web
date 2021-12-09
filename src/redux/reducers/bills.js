import INIT_STATE from '../constant';
import { getType } from '../actions/bills';
import * as billActions from '../actions/bills';

export default function billsReducer(state = INIT_STATE.bills, action) {
  switch (action.type) {
    // get Bills
    case getType(billActions.getBills.getBillsRequest):
      return {
        ...state,
        isLoading: true,
        error: '',
        isSuccess: false,
      };
    case getType(billActions.getBills.getBillsSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case getType(billActions.getBills.getBillsFailure):
      return {
        ...state,
        error: action.payload.message,
        isLoading: false,
      };
    //create Bill
    case getType(billActions.createBill.createBillRequest):
      return {
        ...state,
        error: '',
        isLoading: true,
        isSuccess: false,
      };
    case getType(billActions.createBill.createBillSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(billActions.createBill.createBillFailure):
      return {
        ...state,
        error: action.payload.message,
        isLoading: false,
      };

    // update Bill
    case getType(billActions.updateBill.updateBillRequest):
      return {
        ...state,
        error: '',
        isLoading: true,
        isSuccess: false,
      };
    case getType(billActions.updateBill.updateBillSuccess):
      return {
        ...state,
        data: state.data.map(bill =>
          bill.idBill === action.payload.idBill ? action.payload : bill
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(billActions.updateBill.updateBillFailure):
      return {
        ...state,
        error: action.payload.message,
        isLoading: false,
      };

    //delete Bill
    case getType(billActions.deleteBill.deleteBillRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        error: '',
      };
    case getType(billActions.deleteBill.deleteBillSuccess):
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        data: state.data.filter(bill => bill.idBill !== action.payload),
      };
    case getType(billActions.deleteBill.deleteBillFailure):
      return {
        ...state,
        error: action.payload.message,
        isLoading: false,
      };
    default:
      return state;
  }
}
