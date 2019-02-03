import { typeConvert } from './typeConvert';

describe('typeConvert module', () => {
  it('should just return string', () => {
    const input = 'myString';
    const expected = 'myString';
    const actual = typeConvert(input);

    expect(actual).toEqual(expected);
  });

  it('should cast number', () => {
    const input = '5.2';
    const expected = 5.2;
    const actual = typeConvert(input);

    expect(actual).toEqual(expected);
  });

  it('should cast "undefined" to undefined', () => {
    const input = 'undefined';
    const expected = undefined;
    const actual = typeConvert(input);

    expect(actual).toEqual(expected);
  });

  it('should cast "null" to null', () => {
    const input = 'null';
    const expected = null;
    const actual = typeConvert(input);

    expect(actual).toEqual(expected);
  });

  it('should cast boolean strings to boolean', () => {
    expect(typeConvert('true')).toEqual(true);
    expect(typeConvert('false')).toEqual(false);
  });
});
