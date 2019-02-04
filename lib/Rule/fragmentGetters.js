import {
  staticRuleFragment,
  dynamicRuleFragment,
  dynamicConditionalRuleFragment
} from './matchers';

export const staticGetter = {
  pattern: staticRuleFragment,
  test: urlFragment => urlFragment.match(staticRuleFragment),
  get: (matchingRuleFragment, urlFragment) => ({})
};

export const dynamicGetter = {
  pattern: dynamicRuleFragment,
  test: urlFragment => urlFragment.match(dynamicRuleFragment),
  get: (matchingRuleFragment, urlFragment) => ({
    [matchingRuleFragment.replace(':', '')]: urlFragment
  })
};

export const dynamicConditionalGetter = {
  // pattern: dynamicConditionalRuleFragment,
  // test: (urlFragment) => {
  // },
  // get: (matchingRuleFragment, urlFragment) => ({
  //   const [matchedFragment, key, pattern] = matchingRuleFragment.
  // })
};

export default {
  staticGetter,
  dynamicGetter,
  dynamicConditionalGetter
};
