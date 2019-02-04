import generateFullRule from './generateFullRule';

class Rule {
  constructor(ruleString, defaults = {}) {
    this.defaults = defaults;
    this.ruleString = ruleString;

    const { keys, valuePattern, priority } = generateFullRule(ruleString);

    this.keys = keys;
    this.valuePattern = valuePattern;
    this.priority = priority;
  }

  extractStateFromUrl(url) {
    const { keys, valuePattern, defaults } = this;
    const result = url.match(valuePattern);

    if (result === null) return false;

    return keys.reduce((acc, key, currentIndex) => {
      return Object.assign({}, acc, { [key]: result[currentIndex + 1] });
    }, defaults);
  }

  urlFromState(state) {
    let urlString = this.ruleString.replace(/\(.*\)/g, '');
    const keys = this.keys;

    for (const key of keys) {
      const val = state[key];

      urlString = urlString.replace(new RegExp(`:${key}(?=\/|$)`, 'g'), val);
    }

    return urlString;
  }

  test(url) {
    return this.valuePattern.test(url);
  }

  testState(state) {
    const { keys, defaults } = this;

    for (const k of keys) {
      if (state[k] === undefined) return null;
    }

    for (const defaultProp in defaults) {
      if (state[defaultProp] !== defaults[defaultProp]) return null;
    }

    return keys.length + Object.keys(defaults).length;
  }

  toString() {
    return this.ruleString;
  }
}

export default Rule;
