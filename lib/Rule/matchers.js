export const staticRuleFragment = new RegExp(/^[0-9a-zA-Z-_]+$/);
export const dynamicRuleFragment = new RegExp(/^:[0-9a-zA-Z-_]+$/);
export const dynamicConditionalRuleFragment = new RegExp(
  /^(:[0-9a-zA-Z-_]+)\((.+)\)$/
);

export default {
  staticRuleFragment,
  dynamicRuleFragment,
  dynamicConditionalRuleFragment
};
