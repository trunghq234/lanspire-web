export const postState$ = state => state.posts.data;
export const usersState$ = state => state.users.data;
export const userState$ = state => state.user.data;
export const authState$ = state => state.auth.data;
const postState$ = state => state.posts.data;
const courseState$ = state => state.courses;
const courseTypeState$ = state => state.courseTypes;
const levelState$ = state => state.levels;

export { postState$, courseState$, courseTypeState$, levelState$ };
