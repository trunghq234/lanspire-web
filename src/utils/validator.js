import { titleCase } from './stringHelper';

const numberValidator = (rule, value, callback) => {
  try {
    if (!Number(value) && value) {
      callback(`${titleCase(rule.field)} must be number!`);
    } else {
      callback();
    }
  } catch {
    callback();
  }
};

export { numberValidator };
