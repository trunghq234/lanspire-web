import INIT_STATE from 'redux/constant';
import { getType } from 'redux/actions/parameters';
import * as parameterActions from 'redux/actions/parameters';

export default function parametersReducer(state = INIT_STATE.parameters, action) {
  switch (action.type) {
    //get
    case getType(parameterActions.getParameters.getParametersRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(parameterActions.getParameters.getParametersSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case getType(parameterActions.getParameters.getParametersFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // create
    case getType(parameterActions.createParameter.createParameterRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(parameterActions.createParameter.createParameterSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(parameterActions.createParameter.createParameterFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    //update
    case getType(parameterActions.updateParameter.updateParameterRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(parameterActions.updateParameter.updateParameterSuccess):
      return {
        ...state,
        data: state.data.map(parameter =>
          parameter.idParameter === action.payload.idParameter ? action.payload : parameter
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(parameterActions.updateParameter.updateParameterFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // delete
    case getType(parameterActions.deleteParameter.deleteParameterRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(parameterActions.deleteParameter.deleteParameterSuccess):
      return {
        ...state,
        data: state.data.filter(parameter => parameter.idParameter !== action.payload),
        isLoading: false,
        isSuccess: true,
      };
    case getType(parameterActions.deleteParameter.deleteParameterFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}
