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

const employeesDataExcel = mapToEmployee(employees.data);
const lecturersDataExcel = mapToLecturer(lecturers.data);
const studentsDataExcel = mapToStudent(students.data);
const coursesDataExcel = mapToCourse(courses.data);
const classesDataExcel = mapToClass(classes.data);

export {
  employeesDataExcel,
  lecturersDataExcel,
  studentsDataExcel,
  coursesDataExcel,
  classesDataExcel,
};
