


/**
 * @example
 * const paramObject = deparam('boolKey=true&undefKey&arrayKey[0]=first&arrayKey[1]=second&deep.key.one=nested');
 */
export const deparam = (queryString) => {
  // const strippedQMark = queryString[0] === '?' ? queryString.subString(1) : queryString;
  // const keyValPairs = strippedQMark.split('&').map();

  return {};
};

export default deparam;