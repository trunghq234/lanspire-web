const usersState$ = state => state.users.data;
const userState$ = state => state.user.data;
const authState$ = state => state.auth.data;
const postState$ = state => state.posts.data;
const courseState$ = state => state.courses;
const courseTypeState$ = state => state.courseTypes;
const levelState$ = state => state.levels;
const classState$ = state => state.classes;

export {
  usersState$,
  userState$,
  authState$,
  classState$,
  postState$,
  courseState$,
  courseTypeState$,
  levelState$,
};
