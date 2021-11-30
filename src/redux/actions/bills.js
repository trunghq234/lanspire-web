import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getBills = createActions({
  getBillsRequest: undefined,
  getBillsSuccess: payload => payload,
  getBillsFailure: err => err,
});

export const createBill = createActions({
  createBillRequest: payload => payload,
  createBillSuccess: payload => payload,
  createBillFailure: err => err,
});

export const updateBill = createActions({
  updateBillRequest: payload => payload,
  updateBillSuccess: payload => payload,
  updateBillFailure: err => err,
});

export const deleteBill = createActions({
  deleteBillRequest: payload => payload,
  deleteBillSuccess: payload => payload,
  deleteBillFailure: err => err,
});
