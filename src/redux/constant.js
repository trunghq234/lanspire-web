const INIT_STATE = {
  posts: {
    data: [],
    isLoading: false,
  },
  users: {
    data: [],
    isLoading: false,
  },
  user: {
    data: {},
    isLoading: false,
  },
  auth: {
    data: {},
    isLoading: false,
  },
  employes: {
    data: [],
    isLoading: false,
  },
  timeFrames: {
    data: [],
    isLoading: false,
    isSuccess: false,
    error: '',
  },
};

export default INIT_STATE;
