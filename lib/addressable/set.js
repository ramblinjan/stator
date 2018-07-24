import {
  getAccessorArray
} from './getAccessorArray';

export const set = (obj, prop, val) => {
  const steps = getAccessorArray(prop);

  const setWithSteps = (target, stepsLeft) => {
    if( stepsLeft.length === 1 ) {
      target[stepsLeft] = val;
      return true;
    }

    const currentStep = stepsLeft[0];
    const nextStep = stepsLeft[1];
    const nextRef = target[currentStep];

    if(typeof nextStep === "number" && !(nextRef instanceof Array)) {
      target[currentStep] = (nextRef instanceof Object) ? Object.assign([], nextRef) : [];
    } else if(!(nextRef instanceof Object)) {
      target[currentStep] = {};
    }

    const remaining = stepsLeft.slice(1);
    
    return setWithSteps(target[currentStep], remaining, target);
  };

  return setWithSteps(obj, steps);
};

export default set;