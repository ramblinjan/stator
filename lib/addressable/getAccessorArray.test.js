import {
  getAccessorArray
} from './getAccessorArray';

describe('addressable getAccessorArray()', () => {

  it('should only accept non-empty strings', () => {
    expect(() => getAccessorArray('nonEmptyString')).not.toThrowError();

    ['', 1, undefined, () => {}, {}, [], null, true]
      .forEach(input => expect(() => getAccessorArray(input)).toThrowError());
  });

  it('should return single-item array for root properties', () => {
    expect(getAccessorArray('prop')).toEqual(['prop']);
    expect(getAccessorArray('1')).toEqual(['1']);
  });

  it('should split on object dot accessors', () => {
    const address = 'this.is.an.object.accessor';
    const expected = ['this', 'is', 'an', 'object', 'accessor'];
    const actual = getAccessorArray(address);

    expect(actual).toEqual(expected);
  });

  it('should convert array indices to numbers', () => {
    const address = '[0][one]["1"][1]';
    const expected = [0, 'one', '"1"', 1];
    const actual = getAccessorArray(address);

    expect(actual).toEqual(expected);
  });

  it('should handle a combination of dot and bracket accessors', () => {
    const address = 'root[1][2].three.four[5][6][seven].8[9].ten';
    const expected = ['root', 1, 2, 'three', 'four', 5, 6, 'seven', '8', 9, 'ten'];
    const actual = getAccessorArray(address);

    expect(actual).toEqual(expected);
  });

  it('should prioritize dots as delimiters over brackerts', () => {
    const address = 'root[hel.lo]';
    const expected = ['root[hel', 'lo]'];
    const actual = getAccessorArray(address);
    
    expect(actual).toEqual(expected);
  })
});