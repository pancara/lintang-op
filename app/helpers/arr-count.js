import Ember from 'ember';

export function arrCount(params/*, hash*/) {
  return params[0].length;
}

export default Ember.Helper.helper(arrCount);
