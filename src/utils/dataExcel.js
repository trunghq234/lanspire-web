import moment from 'moment';
const formatDate = 'DD/MM/YYYY';

const mapToEmployee = employees => {
  employees.map(item => {
    return {
      username: item.username,
      displayName: item.displayName,
      email: item.email,
      gender: item.gender === 0 ? 'Male' : item.gender === 1 ? 'Female' : 'Others',
      phoneNumber: item.phoneNumber,
      imageUrl: item.imageUrl === null ? '' : item.imageUrl,
      address: `${item.address[0]} - ${item.address[1]} - ${item.address[2]}`,
      birthday: moment(item.dob).format(formatDate),
      isActivated: item.isActivated === true ? 'Working' : 'Unemployeed',
    };
  });
};

const mapToLecturer = lecturers => {
  lecturers.map(item => {
    return {
      username: item.username,
      displayName: item.displayName,
      email: item.email,
      gender: item.gender === 0 ? 'Male' : item.gender === 1 ? 'Female' : 'Others',
      phoneNumber: item.phoneNumber,
      imageUrl: item.imageUrl === null ? '' : item.imageUrl,
      address: `${item.address[0]} - ${item.address[1]} - ${item.address[2]}`,
      birthday: moment(item.dob).format(formatDate),
      isActivated: item.isActivated === true ? 'Working' : 'Unemployeed',
    };
  });
};

const mapToStudent = students => {
  students.map(item => {
    const { User } = item;
    return {
      displayName: User.displayName,
      email: User.email,
      gender: User.gender === 0 ? 'Male' : User.gender === 1 ? 'Female' : 'Others',
      phoneNumber: User.phoneNumber,
      imageUrl: User.imageUrl === null ? '' : User.imageUrl,
      address: `${User.address[0]} - ${User.address[1]} - ${User.address[2]}`,
      birthday: moment(User.dob).format('DD/MM/YYYY'),
      isActivated: User.isActivated === true ? 'Working' : 'Unemployeed',
    };
  });
};

const mapToCourse = courses => {
  courses.map(item => {
    return {
      courseName: item.courseName,
      level: `${item.Level.levelName} ${item.Level.point}`,
      type: item.CourseType.typeName,
      fee: item.fee,
      description: item.description,
      status: item.isDeleted === false ? 'Teaching' : 'Stop teaching',
    };
  });
};

const mapToClass = classes => {
  classes.map(item => {
    return {
      className: item.className,
      course: item.Course.courseName,
      room: item.room,
      startDate: moment(item.startDate).format(formatDate),
      endDate: moment(item.endDate).format(formatDate),
      numberOfStudent: item.Students.length,
    };
  });
};

export { mapToEmployee, mapToLecturer, mapToStudent, mapToCourse, mapToClass };
