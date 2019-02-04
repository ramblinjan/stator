import {
  staticRuleFragment,
  dynamicRuleFragment,
  dynamicConditionalRuleFragment
} from './matchers';

describe('ruleFragment matchers', () => {
  describe('staticRuleFragment', () => {
    it('should match alphanumeric with dash or underscore', () => {
      expect(staticRuleFragment.test('a')).toBe(true);
      expect(staticRuleFragment.test('9')).toBe(true);
      expect(staticRuleFragment.test('Ab9')).toBe(true);
      expect(staticRuleFragment.test('a-_b3')).toBe(true);
    });

    it('should not match with a colon at the front', () => {
      expect(staticRuleFragment.test(':a')).toBe(false);
      expect(staticRuleFragment.test(':9')).toBe(false);
      expect(staticRuleFragment.test(':Ab9')).toBe(false);
      expect(staticRuleFragment.test(':a-_b3')).toBe(false);
    });
  });

  describe('dynamicRuleFragment', () => {
    it('should match alphanumeric, dash, underscore with colon at the front', () => {
      expect(dynamicRuleFragment.test(':a')).toBe(true);
      expect(dynamicRuleFragment.test(':9')).toBe(true);
      expect(dynamicRuleFragment.test(':Ab9')).toBe(true);
      expect(dynamicRuleFragment.test(':a-_b3')).toBe(true);
    });

    it('should not match without colon', () => {
      expect(dynamicRuleFragment.test('a')).toBe(false);
      expect(dynamicRuleFragment.test('9')).toBe(false);
      expect(dynamicRuleFragment.test('Ab9')).toBe(false);
      expect(dynamicRuleFragment.test('a-_b3')).toBe(false);
    });

    it('should not match when there are parentheses', () => {
      expect(dynamicRuleFragment.test(':a(abc)')).toBe(false);
    });
  });

  describe('dynamicConditionalRuleFragment', () => {
    it('should match same as dynamic rule fragment with parentheses at the end', () => {
      expect(dynamicConditionalRuleFragment.test(':a(a)')).toBe(true);
      expect(dynamicConditionalRuleFragment.test(':9(b|c)')).toBe(true);
      expect(dynamicConditionalRuleFragment.test(':Ab9(a)')).toBe(true);
      expect(dynamicConditionalRuleFragment.test(':a-_b3(d)')).toBe(true);

      expect(dynamicConditionalRuleFragment.test('a()')).toBe(false);
      expect(dynamicConditionalRuleFragment.test('9()')).toBe(false);
      expect(dynamicConditionalRuleFragment.test('Ab9()')).toBe(false);
      expect(dynamicConditionalRuleFragment.test('a-_b3()')).toBe(false);
    });

    it('should not match without parentheses', () => {
      expect(dynamicConditionalRuleFragment.test(':a')).toBe(false);
      expect(dynamicConditionalRuleFragment.test(':9')).toBe(false);
      expect(dynamicConditionalRuleFragment.test(':Ab9')).toBe(false);
      expect(dynamicConditionalRuleFragment.test(':a-_b3')).toBe(false);
    });
  });
});
