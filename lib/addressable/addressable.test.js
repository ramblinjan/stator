import { addressable } from './addressable';

describe('addressable module', () => {
  const getObj = () => ({
    nested: {
      get: 'me'
    },
    nestArr: [0, { get: 'you' }, [1]],
    root: 'root'
  });
  const getProxy = () => addressable(getObj());

  it('should handle non-error get operations identically to standard object', () => {
    const obj = getObj();
    const prox = getProxy();

    expect(obj).toEqual(prox);

    expect(obj.nested.get).toEqual('me');
    expect(prox.nested.get).toEqual('me');

    expect(obj.nestArr[1].get).toEqual('you');
    expect(prox.nestArr[1].get).toEqual('you');

    expect(obj.root).toEqual('root');
    expect(prox.root).toEqual('root');

    expect(obj['nested']['get']).toEqual('me');
    expect(prox['nested']['get']).toEqual('me');

    expect(obj['nestArr'][1]['get']).toEqual('you');
    expect(prox['nestArr'][1].get).toEqual('you');

    expect(obj['root']).toEqual('root');
    expect(prox['root']).toEqual('root');
  });

  describe('handling non-error set operations identically to standard object', () => {
    it('should set new property', () => {
      const obj = getObj();
      const prox = getProxy();

      obj.newRoot = 'newRoot';
      prox.newRoot = 'newRoot';

      expect(obj.newRoot).toEqual('newRoot');
      expect(prox.newRoot).toEqual('newRoot');
      expect(obj).toEqual(prox);
    });

    it('should clobber old property', () => {
      const obj = getObj();
      const prox = getProxy();

      obj.nestArr[1] = 5;
      prox.nestArr[1] = 5;

      const expected = {
        nested: {
          get: 'me'
        },
        nestArr: [0, 5, [1]],
        root: 'root'
      };

      expect(obj).toEqual(expected);
      expect(prox).toEqual(expected);
      expect(obj).toEqual(prox);
    });
  });

  describe('non-standard string getter/setter operations', () => {
    it('should handle deep gets', () => {
      const prox = getProxy();

      expect(prox['nestArr[1].get']).toEqual('you');
      expect(prox['no.no.no']).toEqual(undefined);
    });

    it('should handle deep sets', () => {
      const prox = getProxy();

      prox['no.no.no'] = 1;

      expect(prox.no.no.no).toEqual(1);
    });
  });
});
