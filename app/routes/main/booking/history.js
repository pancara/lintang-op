import Ember from 'ember';

export default Ember.Route.extend({
  init() {
    let buttons = [];
    buttons.push({
      caption: 'Active Booking'
    });

    buttons.push({
      caption: 'History Booking'
    })
    this.set('buttons', buttons);
  },
  activate() {
    this.controllerFor('main.booking').set('activeRoute', 'main.booking.history');
  }
});
