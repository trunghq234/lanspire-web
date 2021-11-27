import { useSelector } from 'react-redux';
import {
  classState$,
  courseState$,
  employeeState$,
  lecturerState$,
  studentState$,
} from 'redux/selectors';
import { mapToEmployee } from 'utils/dataExcel';

const employees = useSelector(employeeState$);
const lecturers = useSelector(lecturerState$);
const students = useSelector(studentState$);
const courses = useSelector(courseState$);
const classes = useSelector(classState$);

const employeesData = mapToEmployee(employees.data);

export { employeesData };
