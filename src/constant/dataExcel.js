import { useSelector } from 'react-redux';
import {
  classState$,
  courseState$,
  employeeState$,
  lecturerState$,
  studentState$,
} from 'redux/selectors';
import {
  mapToClass,
  mapToCourse,
  mapToEmployee,
  mapToLecturer,
  mapToStudent,
} from 'utils/dataExcel';

const employees = useSelector(employeeState$);
const lecturers = useSelector(lecturerState$);
const students = useSelector(studentState$);
const courses = useSelector(courseState$);
const classes = useSelector(classState$);

const employeesData = mapToEmployee(employees.data);
const lecturersData = mapToLecturer(lecturers.data);
const studentsData = mapToStudent(students.data);
const coursesData = mapToCourse(courses.data);
const classesData = mapToClass(classes.data);

export { employeesData, lecturersData, studentsData, coursesData, classesData };
