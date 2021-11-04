const postState$ = state => state.posts.data;
const courseState$ = state => state.courses;
const courseTypeState$ = state => state.courseTypes;
const levelState$ = state => state.levels;
const columnTranscriptState$ = state => state.columnTranscripts;

export { postState$, courseState$, courseTypeState$, levelState$, columnTranscriptState$ };
