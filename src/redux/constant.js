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
  studentById: {
    //Student is get with id
    data: [],
    isLoading: false,
  },
  levels: {
    data: [],
    isLoading: false,
  },
  courseTypes: {
    data: [],
    isLoading: false,
  },
};

export default INIT_STATE;
