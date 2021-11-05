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
  students: {
    data: [],
    isLoading: false,
    isSuccess: false,
    error: '',
  },
  timeFrames: {
    data: [],
    isLoading: false,
    isSuccess: false,
    error: '',
  },
  studentById: {
    //Student is get with id
    data: [],
    isLoading: false,
  },
  courses: {
    data: [],
    isLoading: false,
    isSuccess: false,
  },
  courseTypes: {
    data: [],
    isLoading: false,
    isSuccess: false,
  },
  levels: {
    data: [],
    isLoading: false,
  },
  courseTypes: {
    data: [],
    isLoading: false,
    isSuccess: false,
  },
  classes: {
    data: [],
    isLoading: false,
    isSuccess: false,
  },
};

export default INIT_STATE;
