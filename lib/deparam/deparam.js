import addressable from '../addressable/addressable';
import typeConvert from './typeConvert';

/**
 * @example
 * const paramObject = deparam('boolKey=true&undefKey&arrayKey[0]=first&arrayKey[1]=second&deep.key.one=nested');
 */
export const deparam = queryString => {
  const target = addressable();

  const strippedQMark =
    queryString[0] === '?' ? queryString.substring(1) : queryString;

  const keyValPairs = strippedQMark
    .split('&')
    .map(keyPair => keyPair.split('='))
    .map(([key, val]) => {
      const decodedKey = decodeURIComponent(key);

      if (val === undefined) return [decodedKey, true];

      const decodedVal = decodeURIComponent(val);

      return [decodedKey, typeConvert(decodedVal)];
    })
    .forEach(([key, val]) => {
      target[key] = val;
    });

  return target;
};

export default deparam;
