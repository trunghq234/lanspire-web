import INIT_STATE from '../constant';
import { getType } from '../actions/employes';
import * as employeeActions from '../actions/employes';

export default function employesReducer(state = INIT_STATE.employes, action) {
  switch (action.type) {
    // get Employee
    case getType(employeeActions.getEmployes.getEmployesRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(employeeActions.getEmployes.getEmployesSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case getType(employeeActions.getEmployes.getEmployesFailure):
      return {
        ...state,
        isLoading: false,
      };

    // update Employee
    case getType(employeeActions.updateEmployee.updateEmployeeRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(employeeActions.updateEmployee.updateEmployeeSuccess):
      return {
        ...state,
        data: state.data.map(employee =>
          employee._id === action.payload._id ? action.payload : employee
        ),
      };
    case getType(employeeActions.updateEmployee.updateEmployeeFailure):
      return {
        ...state,
        isLoading: false,
      };

    // create Employee
    case getType(employeeActions.createEmployee.createEmployeeRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(employeeActions.createEmployee.createEmployeeSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(employeeActions.createEmployee.createEmployeeFailure):
      return {
        ...state,
        isLoading: false,
      };

    // delete Employee
    case getType(employeeActions.deleteEmployee.deleteEmployeeRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(employeeActions.deleteEmployee.deleteEmployeeSuccess):
      return {
        ...state,
        data: state.data.filter(employee => employee._id !== action.payload),
      };
    case getType(employeeActions.deleteEmployee.deleteEmployeeFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
