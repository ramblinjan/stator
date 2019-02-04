export const classifyFragmentPattern = new RegExp(
  /^([0-9a-zA-Z-_]+)$|^:([0-9a-zA-Z-_]+)$|^:([0-9a-zA-Z-_]+)\(((?!\)).+)\)$/
);

export const generateFullRule = ruleString => {
  if (ruleString === '/' || ruleString === '')
    return { keys: [], priority: 0, valuePattern: new RegExp(/\/*/) };

  const ruleSections = ruleString
    .split('/')
    .filter(s => s.length)
    .map(fragment => {
      const match = fragment.match(classifyFragmentPattern);

      if (match === null)
        throw new Error(
          `The fragment "${fragment}" in the rule "${rulestring}" has invalid syntax.`
        );

      const [
        fullMatch,
        staticRoute,
        dynamic,
        customPatternDynamic,
        customPattern
      ] = match;

      if (staticRoute) {
        return {
          routeString: staticRoute
        };
      }

      if (dynamic) {
        return {
          key: dynamic,
          routeString: `([0-9a-zA-Z-_]+)`
        };
      }

      return {
        key: customPatternDynamic,
        routeString: `(${customPattern})`
      };
    });

  return {
    keys: ruleSections.map(({ key }) => key).filter(k => !!k),
    priority: ruleSections.length,
    valuePattern: new RegExp(
      ruleSections.map(({ routeString }) => routeString).join('/')
    )
  };
};

export default generateFullRule;
