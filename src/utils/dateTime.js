import moment from 'moment';

const currentDate = () => {
  var today = new Date();
  return moment(
    today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
    'DD/MM/YYYY'
  );
};

export { currentDate };
