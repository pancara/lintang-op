import Ember from 'ember';

export default Ember.Controller.extend({
  detailShown: false,
  init() {
    this.set('aircrafts', this.get('datastub').getAircrafts());
  },

  willDestroy() {
  },

  actions: {
    showDetail(aircraft) {
      let aircraftId = aircraft.get('id');
      console.log(aircraftId);
      this.transitionToRoute('main.aircraft-detail.view', aircraftId).then(function (newRoute) {
        newRoute.set('aircraft', aircraft);
      });
    }
  }
});
