const titleCase = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

const camelToString = string => {
  var result = string.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const formatName = string => {
  const tmp = string.split(' ');
  const strArr = tmp.filter(e => e.length !== 0);
  const res = strArr.reduce((pre, curr) => {
    return pre + ' ' + curr[0].toUpperCase() + curr.slice(1).toLowerCase();
  }, []);
  return res;
};

const parseThousand = number => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const convertCommasToNumber = string => {
  return Number(string.replace(/,/g, ''));
};

export { titleCase, camelToString, formatName, parseThousand, convertCommasToNumber };
