const titleCase = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

const camelToString = string => {
  var result = string.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};
export { titleCase, camelToString };
