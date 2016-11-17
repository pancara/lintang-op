import Ember from 'ember';

export default Ember.Route.extend({
  activate() {
    this.controllerFor('main.booking').set('activeRoute', 'main.booking.active');
  }
});
