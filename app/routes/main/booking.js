import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition() {
      console.log(this.get('routeName'));
      console.log('booking didtransition');
    }
  }
});
