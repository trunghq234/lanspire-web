const countCertainDays = (days, startDate, endDate) => {
  var ndays = 1 + Math.round((endDate - startDate) / (24 * 3600 * 1000));
  var sum = function (a, b) {
    return a + Math.floor((ndays + ((startDate.getDay() + 6 - b) % 7)) / 7);
  };
  return days.reduce(sum, 0);
};

export { countCertainDays };
