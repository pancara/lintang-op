import Ember from 'ember';
import ArrayUtil from '../../utils/array-util';


export default Ember.Controller.extend({
  shownFilter: true,
  availableAircraft: [],
  selectedAircraft: [],
  startDate: new Date(),
  endDate: new Date(),
  aircraftTypes: {
    ultraLongRange: true,
    heavyJet: true,
    superMidSize: true,
    entryLevel: true,
    turboProp: true,
    prop: false,
    heli: false
  },

  componentAvailableAircraft: null,
  componentSelectedAircraft: null,

  init() {
    var aircraftAvailable = [];
    var aircrafts = this.get('datastub').getAircrafts();
    for (var i = 0; i < aircrafts.length; i++) {
      var index = i % aircrafts.length;
      aircraftAvailable.push({
        value: aircrafts[index].id,
        text: aircrafts[index].name
      });
    }
    this.set('aircraftAvailable', aircraftAvailable);

    var aircraftSelected = [{
      value: 100,
      text: 'TEST AIRCRAFT'
    }];
    this.set('aircraftSelected', aircraftSelected);

    // aircraft types
    var aircraftTypes = this.get('datastub').getAircraftTypes();
    console.log(aircraftTypes);

    this.set('aircraftTypes',aircraftTypes);
  },

  actions: {
    toggleFilter() {
      this.toggleProperty('shownFilter');
    }
  }
});
