import INIT_STATE from 'redux/constant';
import { getType } from 'redux/actions/testTypes';
import * as testTypeActions from 'redux/actions/testTypes';

export default function testTypesReducer(state = INIT_STATE.testTypes, action) {
  switch (action.type) {
    //get all
    case getType(testTypeActions.getTestTypes.getTestTypesRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(testTypeActions.getTestTypes.getTestTypesSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case getType(testTypeActions.getTestTypes.getTestTypesFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // create
    case getType(testTypeActions.createTestType.createTestTypeRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(testTypeActions.createTestType.createTestTypeSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(testTypeActions.createTestType.createTestTypeFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    //update
    case getType(testTypeActions.updateTestType.updateTestTypeRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(testTypeActions.updateTestType.updateTestTypeSuccess):
      return {
        ...state,
        data: state.data.map(type =>
          type.idTestType === action.payload.idTestType ? action.payload : type
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(testTypeActions.updateTestType.updateTestTypeFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // delete
    case getType(testTypeActions.deleteTestType.deleteTestTypeRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(testTypeActions.deleteTestType.deleteTestTypeSuccess):
      return {
        ...state,
        data: state.data.filter(type => type.idTestType !== action.payload),
        isLoading: false,
        isSuccess: true,
      };
    case getType(testTypeActions.deleteTestType.deleteTestTypeFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}
