import Ember from 'ember';

export function or(params/*, hash*/) {
  for(var i = 0; i < params.length; i++) {
    if (params[i] === true) {
      return true;
    }
  }
  return false;
}

export default Ember.Helper.helper(or);
