import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this.set('bookings',  this.get('datastub').getHistoryBookings());
  }
});
