import {
  staticGetter,
  dynamicGetter,
  dynamicConditionalGetter
} from './fragmentGetters';

describe('fragmentGetters module', () => {
  describe('staticGetter.get()', () => {
    it('should just return an object', () => {
      expect(staticGetter.get()).toEqual({});
      expect(staticGetter.get('', '')).toEqual({});
    });
  });

  describe('dynamicGetter', () => {
    it('should return object with key from rule fragment and value from url', () => {
      const expected = {
        myVar: 'myVal'
      };
      const actual = dynamicGetter.get(':myVar', 'myVal');

      expect(actual).toEqual(expected);
    });
  });

  // describe('dynamicConditionalGetter', () => {
  //   it('should return object with key from rule fragment and value from url when custom pattern matches', () => {
  //     const expected = {
  //       myVar: 'my1val'
  //     };
  //     const actual = dynamicConditionalGetter.get(':myVar(');
  //     expect(actual).toEqual(expected);
  //   });

  //   it('should return empty object when custom pattern does not match', () => {
  //     const expected = {};
  //   });
  // });
});
