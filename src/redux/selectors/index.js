const usersState$ = state => state.users.data;
const userState$ = state => state.user.data;
const authState$ = state => state.auth.data;
const postState$ = state => state.posts.data;
const courseState$ = state => state.courses;
const courseTypeState$ = state => state.courseTypes;
const levelState$ = state => state.levels;
const columnTranscriptState$ = state => state.columnTranscripts;
const classState$ = state => state.classes;
const timeFrameState$ = state => state.timeFrames;
const employeeState$ = state => state.employees;
const lectureState$ = state => state.lecturers;
const studentState$ = state => state.students;

export {
  usersState$,
  userState$,
  authState$,
  classState$,
  courseState$,
  courseTypeState$,
  levelState$,
  timeFrameState$,
  employeeState$,
  lectureState$,
  studentState$,
  postState$,
  columnTranscriptState$,
};
