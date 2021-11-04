import INIT_STATE from 'redux/constant';
import { getType } from 'redux/actions/levels';
import * as levelActions from 'redux/actions/levels';

export default function levelsReducer(state = INIT_STATE.levels, action) {
  switch (action.type) {
    //get
    case getType(levelActions.getLevels.getLevelsRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(levelActions.getLevels.getLevelsSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case getType(levelActions.getLevels.getLevelsFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // create
    case getType(levelActions.createLevel.createLevelRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(levelActions.createLevel.createLevelSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(levelActions.createLevel.createLevelFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    //update
    case getType(levelActions.updateLevel.updateLevelRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(levelActions.updateLevel.updateLevelSuccess):
      return {
        ...state,
        data: state.data.map(level =>
          level.idLevel === action.payload.idLevel ? action.payload : level
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(levelActions.updateLevel.updateLevelFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // delete
    case getType(levelActions.deleteLevel.deleteLevelRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(levelActions.deleteLevel.deleteLevelSuccess):
      return {
        ...state,
        data: state.data.filter(level => level.idLevel !== action.payload),
        isLoading: false,
        isSuccess: true,
      };
    case getType(levelActions.deleteLevel.deleteLevelFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}
