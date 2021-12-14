import INIT_STATE from 'redux/constant';
import { getType } from 'redux/actions/columnTranscripts';
import * as columnTranscriptActions from 'redux/actions/columnTranscripts';

export default function columnTranscriptsReducer(state = INIT_STATE.columnTranscripts, action) {
  switch (action.type) {
    //get
    case getType(columnTranscriptActions.getColumnTranscripts.getColumnTranscriptsRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(columnTranscriptActions.getColumnTranscripts.getColumnTranscriptsSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case getType(columnTranscriptActions.getColumnTranscripts.getColumnTranscriptsFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // create
    case getType(columnTranscriptActions.createColumnTranscript.createColumnTranscriptRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(columnTranscriptActions.createColumnTranscript.createColumnTranscriptSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(columnTranscriptActions.createColumnTranscript.createColumnTranscriptFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    //update
    case getType(columnTranscriptActions.updateColumnTranscript.updateColumnTranscriptRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(columnTranscriptActions.updateColumnTranscript.updateColumnTranscriptSuccess):
      return {
        ...state,
        data: state.data.map(columnTranscript =>
          columnTranscript.idColumn === action.payload.idColumn ? action.payload : columnTranscript
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(columnTranscriptActions.updateColumnTranscript.updateColumnTranscriptFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // delete
    case getType(columnTranscriptActions.deleteColumnTranscript.deleteColumnTranscriptRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(columnTranscriptActions.deleteColumnTranscript.deleteColumnTranscriptSuccess):
      return {
        ...state,
        data: state.data.filter(columnTranscript => columnTranscript.idColumn !== action.payload),
        isLoading: false,
        isSuccess: true,
      };
    case getType(columnTranscriptActions.deleteColumnTranscript.deleteColumnTranscriptFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}
