import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

const getAllTimeFrames = createActions({
  getAllTimeFramesRequest: undefined,
  getAllTimeFramesSuccess: payload => payload,
  getAllTimeFramesFailure: payload => payload,
});

const createTimeFrame = createActions({
  createTimeFrameRequest: payload => payload,
  createTimeFrameSuccess: payload => payload,
  createTimeFrameFailure: payload => payload,
});

const updateTimeFrame = createActions({
  updateTimeFrameRequest: payload => payload,
  updateTimeFrameSuccess: payload => payload,
  updateTimeFrameFailure: payload => payload,
});

const updateTimeFrames = createActions({
  updateTimeFramesRequest: payload => payload,
  updateTimeFramesSuccess: payload => payload,
  updateTimeFramesFailure: payload => payload,
});

const deleteTimeFrame = createActions({
  deleteTimeFrameRequest: payload => payload,
  deleteTimeFrameSuccess: payload => payload,
  deleteTimeFrameFailure: payload => payload,
});

const getByIdTimeFrame = createActions({
  getByIdTimeFrameRequest: undefined,
  getByIdTimeFrameSuccess: payload => payload,
  getByIdTimeFrameFailure: payload => payload,
});
export {
  getAllTimeFrames,
  createTimeFrame,
  deleteTimeFrame,
  updateTimeFrame,
  getByIdTimeFrame,
  updateTimeFrames,
};
