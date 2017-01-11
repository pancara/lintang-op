import Ember from 'ember';

export default Ember.Controller.extend({
  aircraftCtrl: Ember.inject.controller('main.aircraft'),

  getAircraft() {
    let aircraft = this.get('aircraftCtrl').get('selectedAircraft');
    this.set('aircraft', aircraft);
  }
});
