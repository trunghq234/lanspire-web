const postState$ = state => state.posts.data;
const courseState$ = state => state.courses;
const courseTypeState$ = state => state.courseTypes;

export { postState$, courseState$, courseTypeState$ };
