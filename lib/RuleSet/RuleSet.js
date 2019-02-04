import Rule from '../Rule/Rule';

export class RuleSet {
  rules = [];

  register(rule, defaults) {
    this.rules.push(new Rule(rule, defaults));
  }

  getStateFromUrl(url) {
    const rule = this.getBestRuleForUrl(url);

    return rule.extractStateFromUrl(url);
  }

  getUrlFromState(state) {
    const { rule } = this.getBestRuleForState(state);

    return rule.urlFromState(state);
  }

  getBestRuleForState(state) {
    return this.rules
      .map(r => ({
        rule: r,
        result: r.testState(state)
      }))
      .filter(({ result }) => result !== null)
      .reduce(
        (bestSoFar, next) =>
          bestSoFar.result >= next.result ? bestSoFar : next
      );
  }

  getRuleFromState(state) {
    return this.getBestRuleForState(state).rule.toString();
  }

  getBestRuleForUrl(url) {
    return this.rules
      .filter(r => r.test(url))
      .reduce(
        (bestSoFar, next) =>
          bestSoFar.priority >= next.priority ? bestSoFar : next
      );
  }

  getRuleFromUrl(url) {
    return this.getBestRuleForUrl(url).toString();
  }
}

export default RuleSet;
