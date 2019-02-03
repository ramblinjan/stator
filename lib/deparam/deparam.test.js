import { deparam } from './deparam.js';

describe('deparam module', () => {
  it('should not break when missing ? at start', () => {
    const queryString = 'myRoot=root';
    const expected = {
      myRoot: 'root'
    };
    const actual = deparam(queryString);

    expect(actual).toEqual(expected);
  });

  it('should deparam root string props to object', () => {
    const queryString = '?myRoot=root&myOtherRoot=otherRoot';
    const expected = {
      myRoot: 'root',
      myOtherRoot: 'otherRoot'
    };
    const actual = deparam(queryString);

    expect(actual).toEqual(expected);
  });

  it('should deparam root string props to object when url encoded', () => {
    const queryString = '?myString=%40%23%24%25%5E%26';
    const expected = {
      myString: '@#$%^&'
    };
    const actual = deparam(queryString);

    expect(actual).toEqual(expected);
  });

  it('should convert root primitives other than strings', () => {
    const queryString =
      '?num=1&bool=false&implicitTrue&explicitUndef=undefined&nullVal=null';
    const expected = {
      num: 1,
      bool: false,
      implicitTrue: true,
      explicitUndef: undefined,
      nullVal: null
    };
    const actual = deparam(queryString);

    expect(actual).toEqual(expected);
  });

  it('should handle nested objects', () => {
    const queryString = '?myRoot=root&my.nested.num=1&my[nested].bool=true';
    const expected = {
      myRoot: 'root',
      my: {
        nested: {
          num: 1,
          bool: true
        }
      }
    };
    const actual = deparam(queryString);

    expect(actual).toEqual(expected);
  });

  it('should handle nested objects when url encoded', () => {
    const queryString = '?myRoot=root&my.nested.num=1&my%5Bnested%5D.bool=true';
    const expected = {
      myRoot: 'root',
      my: {
        nested: {
          num: 1,
          bool: true
        }
      }
    };
    const actual = deparam(queryString);
    expect(actual).toEqual(expected);
  });

  it('should handle nested arrays', () => {
    const queryString = '?myRoot=root&myArr[0]=1&myArr[1][0][0].bool=true';
    const expected = {
      myRoot: 'root',
      myArr: [1, [[{ bool: true }]]]
    };
    const actual = deparam(queryString);
    expect(actual).toEqual(expected);
  });

  it('should handle nested arrays when url encoded', () => {
    const queryString = '?myRoot=root&myArr%5B0%5D=1&myArr[1][0][0].bool=true';
    const expected = {
      myRoot: 'root',
      myArr: [1, [[{ bool: true }]]]
    };
    const actual = deparam(queryString);
    expect(actual).toEqual(expected);
  });
});
