import {
  get
} from './get';

describe('get()', () => {

  it('should handle basic root gets', () => {
    const prop = 'root';
    const obj = {
      root: 1
    };
    const expected = 1;
    const actual = get(obj, prop);

    expect(actual).toBe(expected);
  });

  it('should handle nested object dot access', () => {
    const prop = 'root.leaf.leaf';
    const obj = {
      root: {
        leaf: {
          leaf: 1
        }
      }
    };
    const expected = 1;
    const actual = get(obj, prop);

    expect(actual).toBe(expected);
  });

  it('should handle nested object bracket access', () => {
    const prop = '[root][leaf][leaf]';
    const obj = {
      root: {
        leaf: {
          leaf: 1
        }
      }
    };
    const expected = 1;
    const actual = get(obj, prop);

    expect(actual).toBe(expected);
  });

  it('should handle arrays', () => {
    const prop = 'root[0][1]';
    const obj = {
      root: [
        [0, 1]
      ]
    };
    const expected = 1;
    const actual = get(obj, prop);

    expect(actual).toBe(expected);
  });

  it('should handle mix of objects and arrays', () => {
    const prop = 'root.leaf[1]';
    const obj = {
      root: {
        leaf: [0, 1]
      }
    };
    const expected = 1;
    const actual = get(obj, prop);

    expect(actual).toBe(expected);
  });

  it('should return undefined if any property on the way does not exist', () => {
    const prop = 'root.leaf[1]';
    const obj = {
      root: [0]
    };
    const expected = undefined;
    const actual = get(obj, prop);

    expect(actual).toBe(expected);
  });

  it('should return undefined if any property on the way is not accessible / object-like', () => {
    const prop = 'root.leaf[1]';
    const obj = {
      root: 1
    };
    const expected = undefined;
    const actual = get(obj, prop);

    expect(actual).toBe(expected);
  });

});