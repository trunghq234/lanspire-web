import Icon from '@ant-design/icons';
import {
  classSvg,
  courseSvg,
  dashboardSvg,
  employeeSvg,
  homeSvg,
  lecturerSvg,
  studentSvg,
  timeSvg,
  usersSvg,
} from 'utils/iconsvg';

const DashboardIcon = props => <Icon component={dashboardSvg} {...props} />;
const LecturerIcon = props => <Icon component={lecturerSvg} {...props} />;
const CourseIcon = props => <Icon component={courseSvg} {...props} />;
const EmployeeIcon = props => <Icon component={employeeSvg} {...props} />;
const ClassIcon = props => <Icon component={classSvg} {...props} />;
const TimeFrameIcon = props => <Icon component={timeSvg} {...props} />;
const StudentIcon = props => <Icon component={studentSvg} {...props} />;
const HomeIcon = props => <Icon component={homeSvg} {...props} />;
const UsersIcon = props => <Icon component={usersSvg} {...props} />;

export {
  DashboardIcon,
  LecturerIcon,
  CourseIcon,
  EmployeeIcon,
  ClassIcon,
  TimeFrameIcon,
  StudentIcon,
  HomeIcon,
  UsersIcon,
};
