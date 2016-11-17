import Ember from 'ember';

export default Ember.Service.extend({

  authenticate(operatorId, userName, password) {
    return (userName === 'operator');
  }
});
