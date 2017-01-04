import Ember from 'ember';

export default Ember.Route.extend({

  activate() {
    var aircraftAvailable = [];

    var aircrafts = this.get('datastub').getAircrafts();

    for (var i = 0; i < aircrafts.length; i++) {
      var index = i % aircrafts.length;
      aircraftAvailable.push({
        value: aircrafts[index].id,
        text: aircrafts[index].name
      });
    }
    this.controllerFor('main.sales').set('aircraftAvailable', aircraftAvailable);

    var aircraftSelected = [{
      value: 100,
      text: 'TEST AIRCRAFT'
    }];
    this.set('aircraftSelected', aircraftSelected);

    // aircraft types
    var aircraftTypes = this.get('datastub').getAircraftTypes();
    this.controllerFor('main.sales').set('aircraftTypes', aircraftTypes);
  }
});
