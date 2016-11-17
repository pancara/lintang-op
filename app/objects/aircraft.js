import Ember from 'ember';

export default Ember.Object.extend({
  id: null,
  name: null,
  code: null,
  information: null,
  pricing: null,
  active: null,
  open: null,
  type: null,
  seatingMax: null,
  speedKmPerHour: null,
  range: null,
  maintenanceCost: null,
  maxPayload: null,
  marginHourly: 0,
  costHourly: 0
});
