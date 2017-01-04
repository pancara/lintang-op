import Ember from 'ember';
import RegisterAsComponent from '../mixins/register-as-component';

import ArrayUtil from '../utils/array-util';

export default Ember.Component.extend(RegisterAsComponent, {
  classNames: ['panel', 'panel-default', 'panel-filter'],
  classNameBindings: ['shown'],
  shown: true,
  aircraftAvailable: [],
  aircraftSelected: [],
  actions: {

    includeAllAircraft() {
      var aircraftAvailable = this.get('aircraftAvailable');
      var aircraftSelected = this.get('aircraftSelected');

      var newAvailable = [];
      var newSelected = [];

      var arrayUtil = ArrayUtil.create({});
      arrayUtil.join(aircraftAvailable, aircraftSelected, newSelected);

      this.set('aircraftAvailable', newAvailable);
      this.set('aircraftSelected', newSelected);
    },

    excludeAllAircraft() {
      var aircraftAvailable = this.get('aircraftAvailable');
      var aircraftSelected = this.get('aircraftSelected');

      var newAvailable = [];
      var newSelected = [];

      var arrayUtil = ArrayUtil.create({});
      arrayUtil.join(aircraftAvailable, aircraftSelected, newAvailable);

      this.set('aircraftAvailable', newAvailable);
      this.set('aircraftSelected', newSelected);
    },

    includeAircraft() {
      var index = this.get('componentaircraftAvailable').getSelectedIndex();
      if (index < 0) {
        return;
      }

      var aircraftAvailable = this.get('aircraftAvailable');
      var aircraftSelected = this.get('aircraftSelected');

      var item = aircraftAvailable[index];

      var newAvailable = [];
      var newSelected = [];

      var arrayUtil = ArrayUtil.create({});
      arrayUtil.moveItem(aircraftAvailable, aircraftSelected, item, newAvailable, newSelected);

      this.set('aircraftAvailable', newAvailable);
      this.set('aircraftSelected', newSelected);
    },

    excludeAircraft() {
      var index = this.get('componentaircraftSelected').getSelectedIndex();
      if (index < 0) {
        return;
      }

      var aircraftAvailable = this.get('aircraftAvailable');
      var aircraftSelected = this.get('aircraftSelected');

      var item = aircraftSelected[index];

      var newAvailable = [];
      var newSelected = [];

      var arrayUtil = ArrayUtil.create({});
      arrayUtil.moveItem(aircraftSelected, aircraftAvailable, item, newSelected, newAvailable);

      this.set('aircraftAvailable', newAvailable);
      this.set('aircraftSelected', newSelected);
    },

    itemAvailableAction(option) {
      var aircraftAvailable = this.get('aircraftAvailable');
      var aircraftSelected = this.get('aircraftSelected');

      var newAvailable = [];
      var newSelected = [];

      var arrayUtil = ArrayUtil.create({});
      arrayUtil.moveItem(aircraftAvailable, aircraftSelected, option, newAvailable, newSelected);

      this.set('aircraftAvailable', newAvailable);
      this.set('aircraftSelected', newSelected);
    },

    itemSelectedAction(option) {
      var aircraftAvailable = this.get('aircraftAvailable');
      var aircraftSelected = this.get('aircraftSelected');

      var newAvailable = [];
      var newSelected = [];

      var arrayUtil = ArrayUtil.create({});
      arrayUtil.moveItem(aircraftSelected, aircraftAvailable, option, newSelected, newAvailable);

      this.set('aircraftAvailable', newAvailable);
      this.set('aircraftSelected', newSelected);
    },

    applyFilter() {
      var aircraftTypes_1 = this.get('checkboxAircraftTypes_1').getSelected();
      var aircraftTypes_2 = this.get('checkboxAircraftTypes_2').getSelected();

      var newSelected = [];
      var arrayUtil = ArrayUtil.create({});
      arrayUtil.join(aircraftTypes_1, aircraftTypes_2, newSelected);

      var filter = {
        startDate: this.get('datepickerStartDate').get('value'),
        endDate: this.get('datepickerEndDate').get('value'),
        aircrafts: this.get('aircraftSelected'),
        aircraftTypes: newSelected
      };

      this.sendAction('applyFilter', filter);
    }
  }
});
