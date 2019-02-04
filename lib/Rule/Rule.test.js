import Rule from './Rule';

describe('Rule module', () => {
  describe('constructor', () => {});

  describe('extractStateFromUrl()', () => {
    it('should return false if not matching', () => {
      const rule = new Rule('/nomatch');
      const expected = false;
      const actual = rule.extractStateFromUrl('/match');

      expect(actual).toEqual(expected);
    });

    it('should generate state using only defaults', () => {
      const rule = new Rule('/home', { page: 'home' });

      const expected = {
        page: 'home'
      };

      const actual = rule.extractStateFromUrl('/home');

      expect(actual).toEqual(expected);
    });

    it('should generate state using dynamic route', () => {
      const rule = new Rule('/home/:user/:greeting(hello|hola)');

      const expected = {
        greeting: 'hola',
        user: 'sally'
      };

      const actual = rule.extractStateFromUrl('/home/sally/hola');

      expect(actual).toEqual(expected);
    });
  });

  describe('testState()', () => {
    it('should return number of matched keys if all keys match', () => {
      const rule = new Rule('/:key/:value');

      const expected = 2;
      const actual = rule.testState({ key: 'key', value: 'value' });

      expect(actual).toEqual(expected);
    });

    it('should not match if any keys are missing', () => {
      const rule = new Rule('/:key/:value');

      const expected = null;
      const actual = rule.testState({ key: 'key' });

      expect(actual).toEqual(expected);
    });

    it('should match if state matches provided defaults', () => {
      const rule = new Rule('/:key/:value', { page: 'home' });

      const expected = 3;
      const actual = rule.testState({
        key: 'key',
        value: 'value',
        page: 'home'
      });

      expect(actual).toEqual(expected);
    });

    it('should not match if state is missing any provided defaults', () => {
      const rule = new Rule('/:key/:value', { page: 'home' });

      const expected = null;
      const actual = rule.testState({
        key: 'key',
        value: 'value'
      });

      expect(actual).toEqual(expected);
    });

    it('should not match if state does not match provided default value', () => {
      const rule = new Rule('/:key/:value', { page: 'home' });

      const expected = null;
      const actual = rule.testState({
        key: 'key',
        value: 'value',
        page: 'otherpage'
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('urlFromState()', () => {
    it('should populate url with values from state', () => {
      const rule = new Rule('/hi/:page/:section');

      const expected = '/hi/home/about';
      const actual = rule.urlFromState({
        page: 'home',
        section: 'about'
      });

      expect(actual).toEqual(expected);
    });

    it('should strip parentheses in rules and assume conditionals passed', () => {
      const rule = new Rule('/:page(dafhiohe)/:section');

      const expected = '/home/about';
      const actual = rule.urlFromState({
        page: 'home',
        section: 'about'
      });

      expect(actual).toEqual(expected);
    });
  });
});
