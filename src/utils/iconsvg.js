const dashboardSvg = () => (
  <svg
    width="1.2em"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor">
    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
  </svg>
);

const lecturerSvg = () => (
  <svg
    width="1.2em"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="chalkboard-teacher"
    className="svg-inline--fa fa-chalkboard-teacher fa-w-20"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512">
    <path
      fill="currentColor"
      d="M208 352c-2.39 0-4.78.35-7.06 1.09C187.98 357.3 174.35 360 160 360c-14.35 0-27.98-2.7-40.95-6.91-2.28-.74-4.66-1.09-7.05-1.09C49.94 352-.33 402.48 0 464.62.14 490.88 21.73 512 48 512h224c26.27 0 47.86-21.12 48-47.38.33-62.14-49.94-112.62-112-112.62zm-48-32c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96zM592 0H208c-26.47 0-48 22.25-48 49.59V96c23.42 0 45.1 6.78 64 17.8V64h352v288h-64v-64H384v64h-76.24c19.1 16.69 33.12 38.73 39.69 64H592c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0z"></path>
  </svg>
);

const courseSvg = () => (
  <svg
    width="1.2em"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="graduation-cap"
    className="svg-inline--fa fa-graduation-cap fa-w-20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512">
    <path
      fill="currentColor"
      d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z"></path>
  </svg>
);

const employeeSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);
const classSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="mdi-google-classroom"
    height="1.2em"
    viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M23,2H1A1,1 0 0,0 0,3V21A1,1 0 0,0 1,22H23A1,1 0 0,0 24,21V3A1,1 0 0,0 23,2M22,20H20V19H15V20H2V4H22V20M10.29,9.71A1.71,1.71 0 0,1 12,8C12.95,8 13.71,8.77 13.71,9.71C13.71,10.66 12.95,11.43 12,11.43C11.05,11.43 10.29,10.66 10.29,9.71M5.71,11.29C5.71,10.58 6.29,10 7,10A1.29,1.29 0 0,1 8.29,11.29C8.29,12 7.71,12.57 7,12.57C6.29,12.57 5.71,12 5.71,11.29M15.71,11.29A1.29,1.29 0 0,1 17,10A1.29,1.29 0 0,1 18.29,11.29C18.29,12 17.71,12.57 17,12.57C16.29,12.57 15.71,12 15.71,11.29M20,15.14V16H16L14,16H10L8,16H4V15.14C4,14.2 5.55,13.43 7,13.43C7.55,13.43 8.11,13.54 8.6,13.73C9.35,13.04 10.7,12.57 12,12.57C13.3,12.57 14.65,13.04 15.4,13.73C15.89,13.54 16.45,13.43 17,13.43C18.45,13.43 20,14.2 20,15.14Z"
    />
  </svg>
);

const timeSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="mdi-google-classroom"
    height="1.2em"
    viewBox="0 0 24 24">
    <path
      fill="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const studentSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="user-graduate"
    class="svg-inline--fa fa-user-graduate fa-w-14"
    role="img"
    viewBox="0 0 448 512">
    <path
      fill="currentColor"
      d="M319.4 320.6L224 416l-95.4-95.4C57.1 323.7 0 382.2 0 454.4v9.6c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-9.6c0-72.2-57.1-130.7-128.6-133.8zM13.6 79.8l6.4 1.5v58.4c-7 4.2-12 11.5-12 20.3 0 8.4 4.6 15.4 11.1 19.7L3.5 242c-1.7 6.9 2.1 14 7.6 14h41.8c5.5 0 9.3-7.1 7.6-14l-15.6-62.3C51.4 175.4 56 168.4 56 160c0-8.8-5-16.1-12-20.3V87.1l66 15.9c-8.6 17.2-14 36.4-14 57 0 70.7 57.3 128 128 128s128-57.3 128-128c0-20.6-5.3-39.8-14-57l96.3-23.2c18.2-4.4 18.2-27.1 0-31.5l-190.4-46c-13-3.1-26.7-3.1-39.7 0L13.6 48.2c-18.1 4.4-18.1 27.2 0 31.6z"
    />
  </svg>
);

const dateSvg = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="calendar"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true">
    <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
  </svg>
);
const fullNameSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const genderSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.0"
    viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet">
    <g
      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
      fill="currentColor"
      stroke="none">
      <path d="M2559 5097 c-61 -32 -99 -89 -106 -159 -7 -68 8 -117 50 -165 64 -73 60 -73 552 -73 l440 0 -391 -391 -391 -391 -80 46 c-274 160 -646 195 -952 91 -184 -62 -392 -205 -511 -349 -172 -210 -257 -432 -267 -701 -11 -287 70 -539 242 -760 165 -211 372 -343 653 -415 l42 -11 0 -409 0 -410 -244 0 c-256 0 -286 -4 -344 -47 -106 -79 -102 -262 8 -338 53 -37 119 -45 361 -45 l219 0 0 -174 c0 -204 10 -268 49 -316 49 -61 95 -81 177 -78 90 4 141 36 179 111 24 49 25 57 25 253 l0 202 258 4 c240 3 260 5 297 25 22 11 50 32 62 45 75 80 68 224 -13 300 -58 54 -81 58 -354 58 l-250 0 0 410 0 410 28 6 c238 53 443 170 607 346 134 144 225 311 277 509 19 72 22 110 23 274 0 165 -3 202 -22 278 -28 107 -69 207 -126 309 l-44 76 394 394 393 393 0 -445 c0 -499 0 -493 73 -557 81 -71 197 -69 277 3 74 67 71 32 68 851 l-3 731 -30 44 c-18 25 -49 52 -75 66 l-44 22 -732 0 -731 0 -44 -23z m-346 -1423 c255 -56 469 -257 549 -514 33 -108 33 -293 -1 -400 -99 -321 -376 -530 -700 -530 -118 0 -211 19 -303 62 -267 123 -431 377 -431 668 -1 127 24 225 86 344 74 144 237 287 387 342 126 45 287 56 413 28z" />
    </g>
  </svg>
);
const phoneSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);
const emailSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const locationSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
export {
  dashboardSvg,
  lecturerSvg,
  courseSvg,
  employeeSvg,
  classSvg,
  timeSvg,
  studentSvg,
  dateSvg,
  fullNameSvg,
  genderSvg,
  phoneSvg,
  locationSvg,
  emailSvg,
};
