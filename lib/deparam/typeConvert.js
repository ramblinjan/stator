export const typeConvert = stringVal => {
  switch (stringVal) {
    case 'true':
      return true;
    case 'false':
      return false;
    case 'undefined':
      return undefined;
    case 'null':
      return null;
  }

  const attemptNumber = parseFloat(stringVal);

  if (!isNaN(attemptNumber)) return attemptNumber;

  return stringVal;
};

export default typeConvert;
