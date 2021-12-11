import {
  cashSvg,
  classSvg,
  cogSvg,
  courseSvg,
  dashboardSvg,
  expandSvg,
  studentSvg,
  userGroupSvg,
  usersSvg,
  userCircleSvg,
  homeSvg,
} from 'utils/iconsvg';
import Icon from '@ant-design/icons';

const HomeIcon = props => <Icon component={homeSvg} {...props} />;
const DashboardIcon = props => <Icon component={dashboardSvg} {...props} />;
const CourseIcon = props => <Icon component={courseSvg} {...props} />;
const UsersIcon = props => <Icon component={usersSvg} {...props} />;
const UserGroupIcon = props => <Icon component={userGroupSvg} {...props} />;
const ClassIcon = props => <Icon component={classSvg} {...props} />;
const StudentIcon = props => <Icon component={studentSvg} {...props} />;
const CashIcon = props => <Icon component={cashSvg} {...props} />;
const ExpandIcon = props => <Icon component={expandSvg} {...props} />;
const CogIcon = props => <Icon component={cogSvg} {...props} />;
const UserCircleIcon = props => <Icon component={userCircleSvg} {...props} />;

export {
  HomeIcon,
  DashboardIcon,
  CourseIcon,
  UsersIcon,
  UserGroupIcon,
  ClassIcon,
  StudentIcon,
  CashIcon,
  ExpandIcon,
  CogIcon,
  UserCircleIcon,
};
