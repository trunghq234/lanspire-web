import { getType } from 'redux/actions/timeFrames';
import INIT_STATE from 'redux/constant';
import * as timeFrameActions from 'redux/actions/timeFrames';

const timeFrameReducer = (state = INIT_STATE.timeFrames, action) => {
  switch (action.type) {
    //get all
    case getType(timeFrameActions.getAllTimeFrames.getAllTimeFramesRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        error: '',
      };
    case getType(timeFrameActions.getAllTimeFrames.getAllTimeFramesSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case getType(timeFrameActions.getAllTimeFrames.getAllTimeFramesFailure):
      return {
        ...state,
        error: action.message,
        isLoading: false,
        isSuccess: false,
      };
    //create
    case getType(timeFrameActions.createTimeFrame.createTimeFrameRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        error: '',
      };
    case getType(timeFrameActions.createTimeFrame.createTimeFrameSuccess):
      return {
        ...state,
        data: [...state.data, ...action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(timeFrameActions.createTimeFrame.createTimeFrameFailure):
      return {
        ...state,
        error: action.message,
        isLoading: false,
        isSuccess: false,
      };
    //Update
    case getType(timeFrameActions.updateTimeFrame.updateTimeFrameRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        error: '',
      };
    case getType(timeFrameActions.updateTimeFrame.updateTimeFrameSuccess):
      return {
        ...state,
        data: state.data.map(timeFrame =>
          timeFrame.idTimeFrame === action.payload.idTimeFrame ? action.payload : timeFrame
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(timeFrameActions.updateTimeFrame.updateTimeFrameFailure):
      return {
        ...state,
        error: action.message,
        isLoading: false,
        isSuccess: false,
      };
    //Update all
    case getType(timeFrameActions.updateTimeFrames.updateTimeFramesRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        error: '',
      };
    case getType(timeFrameActions.updateTimeFrames.updateTimeFramesSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case getType(timeFrameActions.updateTimeFrames.updateTimeFramesFailure):
      return {
        ...state,
        error: action.message,
        isLoading: false,
        isSuccess: false,
      };
    //delete
    case getType(timeFrameActions.deleteTimeFrame.deleteTimeFrameRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        error: '',
      };
    case getType(timeFrameActions.deleteTimeFrame.deleteTimeFrameSuccess):
      return {
        ...state,
        data: state.data.filter(timeFrame => timeFrame.idTimeFrame !== action.payload),
        isLoading: false,
        isSuccess: true,
      };
    case getType(timeFrameActions.deleteTimeFrame.deleteTimeFrameFailure):
      return {
        ...state,
        error: action.message,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default timeFrameReducer;
