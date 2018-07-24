
import { set } from './set';

describe('addressable set()', () => {

  describe('when properties and values on the way exist', () => {

    it('should handle basic root set', () => {
      const prop = 'root';
      const obj = {};
      const val = 1;

      const expected = {root: 1};
      set(obj, prop, val);

      expect(obj).toEqual(expected);
    });

    it('should handle setting at nested object address', () => {
      const prop = 'root.leaf.leaf';
      const obj = {
        root: {
          leaf: {}
        }
      };
      const val = 1;

      const expected = {root: {leaf: {leaf: 1}}};
      set(obj, prop, val);

      expect(obj).toEqual(expected);
    });

    it('should handle setting at nested object using brackets', () => {
      const prop = '[root][leaf][leaf]';
      const obj = {
        root: {
          leaf: {}
        }
      };
      const val = 1;

      const expected = {root: {leaf: {leaf: 1}}};
      set(obj, prop, val);

      expect(obj).toEqual(expected);
    });

    it('should handle arrays', () => {
      const prop = 'root[0][1]';
      const obj = {
        root: [
          [0]
        ]
      };
      const val = 1;

      const expected = {root: [[0, 1]]};
      set(obj, prop, val);

      expect(obj).toEqual(expected);
    });

    it('should handle mix of objects and arrays', () => {
      const prop = 'root.leaf[1]';
      const obj = {
        root: {
          leaf: [0]
        }
      };
      const val = 1;

      const expected = {root: {leaf: [0, 1]}};
      set(obj, prop, val);

      expect(obj).toEqual(expected);
    });
  });

  describe("when properties and values on the way DON'T exist", () => {

    it('should handle setting at nested object address', () => {
      const prop = 'root.leaf.leaf';
      const obj = {};
      const val = 1;

      const expected = {root: {leaf: {leaf: 1}}};
      set(obj, prop, val);

      expect(obj).toEqual(expected);
    });

    it('should handle setting at nested object using brackets', () => {
      const prop = '[root][leaf][leaf]';
      const obj = {};
      const val = 1;

      const expected = {root: {leaf: {leaf: 1}}};
      set(obj, prop, val);

      expect(obj).toEqual(expected);
    });

    it('should handle arrays', () => {
      const prop = 'root[0][1]';
      const obj = {};
      const val = 1;

      const expected = {root: [[undefined, 1]]};
      set(obj, prop, val);

      expect(obj).toEqual(expected);
    });

    it('should handle mix of objects and arrays', () => {
      const prop = 'root.leaf[1]';
      const obj = {};
      const val = 1;

      const expected = {root: {leaf: [undefined, 1]}};
      set(obj, prop, val);

      expect(obj).toEqual(expected);
    });

    it('should not clobber properties on objects when creating arrays', () => {
      const prop = 'root.leaf[1]';
      const obj = {
        root: {
          leaf: {
            friend: 'butterfly'
          }
        }
      };
      const val = 1;
      
      const arr = [undefined, 1];
      arr.friend = 'butterfly';

      const expected = {
        root: {
          leaf: arr
        }
      };
      set(obj, prop, val);

      expect(obj).toEqual(expected);
    });
  });

});