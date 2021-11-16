const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export const createRequestTypes = base => {
  const types = [REQUEST, SUCCESS, FAILURE];
  return types.reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
};
