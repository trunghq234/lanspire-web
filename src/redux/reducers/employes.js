import INIT_STATE from '../constant';
import { getType } from '../actions/employees';
import * as employeeActions from '../actions/employees';

export default function employesReducer(state = INIT_STATE.employees, action) {
  switch (action.type) {
    // get Employee
    case getType(employeeActions.getEmployees.getEmployeesRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(employeeActions.getEmployees.getEmployeesSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case getType(employeeActions.getEmployees.getEmployeesFailure):
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
          employee.idEmployee === action.payload.idEmployee ? action.payload : employee
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
        data: state.data.filter(employee => employee.idEmployee !== action.payload),
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
