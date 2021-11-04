import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getColumnTranscripts = createActions({
  getColumnTranscriptsRequest: undefined,
  getColumnTranscriptsSuccess: payload => payload,
  getColumnTranscriptsFailure: error => error,
});

export const createColumnTranscript = createActions({
  createColumnTranscriptRequest: payload => payload,
  createColumnTranscriptSuccess: payload => payload,
  createColumnTranscriptFailure: error => error,
});

export const updateColumnTranscript = createActions({
  updateColumnTranscriptRequest: payload => payload,
  updateColumnTranscriptSuccess: payload => payload,
  updateColumnTranscriptFailure: error => error,
});

export const deleteColumnTranscript = createActions({
  deleteColumnTranscriptRequest: payload => payload,
  deleteColumnTranscriptSuccess: payload => payload,
  deleteColumnTranscriptFailure: error => error,
});
