import RuleSet from './RuleSet';

describe('RuleSet', () => {
  describe('getRuleFromUrl()', () => {
    it('should find a matching route', () => {
      const ruleSet = new RuleSet();
      ruleSet.register('/my/route');
      ruleSet.register('/my/bad/route');

      const expected = '/my/route';
      const actual = ruleSet.getRuleFromUrl('/my/route');

      expect(actual).toEqual(expected);
    });

    it('should find route that matches the longest ruleset when multiple static options', () => {
      const ruleSet = new RuleSet();
      ruleSet.register('/my');
      ruleSet.register('/my/route');
      ruleSet.register('/my/route/more');

      const expected = '/my/route/more';
      const actual = ruleSet.getRuleFromUrl('/my/route/more');

      expect(actual).toEqual(expected);
    });

    it('should return first registered route when rule lengths are equal', () => {
      const ruleSet = new RuleSet();
      ruleSet.register('/:my/:route');
      ruleSet.register('/my/route');

      const expected = '/:my/:route';
      const actual = ruleSet.getRuleFromUrl('/my/route');

      expect(actual).toEqual(expected);
    });
  });

  describe('getRuleFromState()', () => {
    /**
     * Prior art: https://canjs.com/doc/can-route.html#Findingthematchedroute
     */
    it('should get rule with all properties set', () => {
      const ruleSet = new RuleSet();
      ruleSet.register('/my/:route/:wrong');
      ruleSet.register('/my/:route', { myDefault: 'default' });

      const expected = '/my/:route';
      const actual = ruleSet.getRuleFromState({
        route: 'myRoute',
        myDefault: 'default'
      });

      expect(actual).toEqual(expected);
    });

    it('should get rule with the most properties set', () => {
      const ruleSet = new RuleSet();
      ruleSet.register('/:route/:matches');
      ruleSet.register('/:route/:matches/:more');

      const expected = '/:route/:matches/:more';
      const actual = ruleSet.getRuleFromState({
        route: 'route',
        matches: 'matches',
        more: 'more'
      });

      expect(actual).toEqual(expected);
    });

    it('should get first rule set when tied for property matches', () => {
      const ruleSet = new RuleSet();

      ruleSet.register('/', { page: 'home' });
      ruleSet.register('/:section');

      const expected = '/';
      const actual = ruleSet.getRuleFromState({
        page: 'home',
        section: 'section'
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('getStateFromUrl()', () => {
    it('should generate state from best available rule', () => {
      const ruleSet = new RuleSet();
      ruleSet.register('/:my/:route');
      ruleSet.register('/my/route');

      const expected = {
        my: 'my',
        route: 'route'
      };
      const actual = ruleSet.getStateFromUrl('/my/route');

      expect(actual).toEqual(expected);
    });
  });

  describe('getUrlFromState()', () => {
    it('should generate url from best available rule for state', () => {
      const ruleSet = new RuleSet();
      ruleSet.register('/:route/:matches');
      ruleSet.register('/:route/:matches/:more');

      const expected = '/my/new/route';
      const actual = ruleSet.getUrlFromState({
        route: 'my',
        matches: 'new',
        more: 'route'
      });

      expect(actual).toEqual(expected);
    });
  });
});
