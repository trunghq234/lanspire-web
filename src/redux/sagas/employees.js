import { call, put } from 'redux-saga/effects';
import employeeApi from '../../api/employeeApi';
import * as employeeActions from '../actions/employees';

export function* fetchEmployeesSaga(action) {
  try {
    const employees = yield call(employeeApi.getAll);

    yield put(employeeActions.getEmployees.getEmployeesSuccess(employees));
  } catch (error) {
    yield put(employeeActions.getEmployees.getEmployeesFailure(error));
  }
}

export function* updateEmployeeSaga(action) {
  try {
    yield call(employeeApi.updateEmployee, action.payload);

    console.log(action.payload);
    yield put(employeeActions.updateEmployee.updateEmployeeSuccess(action.payload));
  } catch (error) {
    yield put(employeeActions.updateEmployee.updateEmployeeFailure(error));
  }
}

export function* deleteEmployeeSaga(action) {
  try {
    yield call(employeeApi.deleteEmployee, action.payload);
    yield put(employeeActions.deleteEmployee.deleteEmployeeSuccess(action.payload));
  } catch (error) {
    yield put(employeeActions.deleteEmployee.deleteEmployeeFailure(error));
  }
}

export function* createEmployeeSaga(action) {
  try {
    const createdEmployee = yield call(employeeApi.createEmployee, action.payload);

    yield put(employeeActions.createEmployee.createEmployeeSuccess(createdEmployee));
  } catch (error) {
    yield put(employeeActions.createEmployee.createEmployeeFailure(error));
  }
}
