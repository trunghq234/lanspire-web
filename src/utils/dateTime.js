import moment from 'moment';

const currentDate = () => {
  var today = new Date();
  return moment(
    today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
    'DD/MM/YYYY'
  );
};

const compareTime = (t1, t2) => {
  return Date.parse(`2/4/2000 ${t1}`) >= Date.parse(`2/4/2000 ${t2}`);
};

//s1,e1,s2,e2 is string
const isTimeFrameOverlap = (s1, e1, s2, e2) => {
  if (compareTime(s2, s1) && compareTime(e1, s2)) {
    return true;
  }
  if (compareTime(s1, s2) && compareTime(e2, s1)) {
    return true;
  }
  return false;
};
//ktra khi thêm 1 lớp vào có bị trùng lịch hay không --- có: true, không: false
const isConflictTimetable = (classTimes, currentTimetable) => {
  var res = false;
  for (let i = 0; i < classTimes.length; ++i) {
    const item = classTimes[i];
    const tmp = currentTimetable.filter(element => element.dayOfWeek === item.dayOfWeek);

    const a = tmp.every(
      time =>
        !isTimeFrameOverlap(
          time.startingTime,
          time.endingTime,
          item.TimeFrame.startingTime,
          item.TimeFrame.endingTime
        )
    );
    if (!a) {
      res = true;
      break;
    }
  }
  return res;
};

const countCertainDays = (days, startDate, endDate) => {
  var ndays = 1 + Math.round((endDate - startDate) / (24 * 3600 * 1000));
  var sum = function (a, b) {
    return a + Math.floor((ndays + ((startDate.getDay() + 6 - b) % 7)) / 7);
  };
  return days.reduce(sum, 0);
};

const formatDate = date => {
  return moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
};

export {
  currentDate,
  isTimeFrameOverlap,
  isConflictTimetable,
  compareTime,
  countCertainDays,
  formatDate,
};
