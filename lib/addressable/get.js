import {
  getAccessorArray
} from './getAccessorArray';

export const get = (target, property) => {
  if(typeof property !== 'string') return Reflect.get(...arguments);
  const steps = getAccessorArray(property);
  let current = target;

  for(let i = 0; i < steps.length; i++) {
    if ( !(current instanceof Object) ) return;
    
    current = current[steps[i]];
  }

  return current;
}

export default get;