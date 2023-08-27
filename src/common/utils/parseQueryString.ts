import qs from 'qs';

const parseObject = (object) => {
  if (typeof object === 'object') {
    return Object.entries(object)
      .map(([k, v]) => [k, parseObject(v)])
      .reduce((acc, val) => Object.assign({}, acc, { [val[0]]: val[1] }), {});
  }

  if (/^-?[0-9]+$/.test(object)) {
    return parseInt(object, 10);
  }

  const keywords = {
    true: true,
    false: false,
    null: null,
    undefined: undefined,
  };
  if (object in keywords) {
    return keywords[object];
  }

  return object;
};

export const parseQueryString = (search) => {
  const qsParsed = qs.parse(search, { ignoreQueryPrefix: true });

  return parseObject(qsParsed);
};
