import INIT_STATE from '../constant';
import { getType } from '../actions/levels';
import * as levelActions from '../actions/levels';

export default function LevelsReducer(state = INIT_STATE.levels, action) {
  switch (action.type) {
    // get Level
    case getType(levelActions.getLevels.getLevelsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(levelActions.getLevels.getLevelsSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case getType(levelActions.getLevels.getLevelsFailure):
      return {
        ...state,
        isLoading: false,
      };

    //create Level
    case getType(levelActions.createLevels.createLevelsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(levelActions.createLevels.createLevelsSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(levelActions.createLevels.createLevelsFailure):
      return {
        ...state,
      };

    // update Level
    case getType(levelActions.updateLevels.updateLevelsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(levelActions.updateLevels.updateLevelsSuccess):
      return {
        ...state,
        data: state.data.map(level =>
          level.idLevel === action.payload.idLevel ? action.payload : Level
        ),
        isLoading: false,
      };
    case getType(levelActions.updateLevels.updateLevelsFailure):
      return {
        ...state,
        isLoading: false,
      };

    //delete Level
    case getType(levelActions.deleteLevels.deleteLevelsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(levelActions.deleteLevels.deleteLevelsSuccess):
      return {
        ...state,
        data: state.data.filter(level => level.idLevel !== action.payload),
      };
    case getType(levelActions.deleteLevels.deleteLevelsFailure):
      return {
        ...state,
      };
    default:
      return state;
  }
}
