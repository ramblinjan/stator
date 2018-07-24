import { get } from './get';
import { set } from './set';

export const addressable = (target = {}) => new Proxy(target, {
  get,
  set
});

export default addressable;