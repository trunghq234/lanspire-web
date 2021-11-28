import { call, put } from 'redux-saga/effects';
import billApi from '../../api/billApi';
import * as billActions from '../actions/bills';

export function* fetchBillsSaga(action) {
  try {
    const bills = yield call(billApi.getAll);
    yield put(billActions.getBills.getBillsSuccess(bills));
  } catch (error) {
    yield put(billActions.getBills.getBillsFailure(error));
  }
}

export function* createBillSaga(action) {
  try {
    const newBill = yield call(billApi.create, action.payload);

    yield put(billActions.createBill.createBillSuccess(newBill));
  } catch (error) {
    yield put(billActions.createBill.createBillFailure(error));
  }
}

export function* updateBillSaga(action) {
  try {
    yield call(billApi.update, action.payload);

    yield put(billActions.updateBill.updateBillSuccess(action.payload));
  } catch (error) {
    yield put(billActions.updateBill.updateBillFailure(error));
  }
}

export function* deleteBillSaga(action) {
  try {
    yield call(billApi.remove, action.payload);
    yield put(billActions.deleteBill.deleteBillSuccess(action.payload));
  } catch (error) {
    yield put(billActions.deleteBill.deleteBillFailure(error));
  }
}
