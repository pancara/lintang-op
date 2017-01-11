import Ember from 'ember'
import Operator from '../../../objects/operator';
import UnitUtil from '../../../utils/unit-util';


export default Ember.Controller.extend({
  dataStub: Ember.inject.service('datastub'),
  cryptService: Ember.inject.service('crypt-service'),
  securityService: Ember.inject.service('security-service'),
  requestSender: Ember.inject.service('requestSender'),

  aircraft: null,
  operator: null,
  firstName: null,
  lastName: null,
  gender: null,
  userName: null,
  password: null,
  confirmation: null,

  error: false,
  errorMessage: 'Error',
  success: false,

  keywordOperator: null,
  keywordAirport: null,

  operatorSearchMode: false,
  airportSearchMode: false,

  afterRender() {
    this.set('genders', this.get('dataStub').getGenders());
    this.set('aircraftTypes', this.get('dataStub').getAircraftTypes());
    this.set('aircraftStatuses', this.get('dataStub').getAircraftStatuses());
  },

  reset() {
    this.set('aircraft', null);
    this.set('model', null);
    this.set('registrationNumber', null);
    this.set('aircraftType', null);
    this.set('safetyRating', null);
    this.set('description', null);
    this.set('yearOfMake', null);
    this.set('maxPassengers', null);
    this.set('speedKts', null);
    this.set('speedKmh', null);
    this.set('maxRangeKm', null);
    this.set('maxRangeNm', null);
    this.set('basePrice', null);
    this.set('marginPrice', null);
    this.set('status', null);
    this.set('airport', null);

    this.set('error', false);
    this.set('success', false);
  },

  edit(aircraft) {
    this.reset();
    this.set('aircraft', aircraft);

    this.set('model', aircraft.model);
    this.set('registrationNumber', aircraft.registrationNumber);
    this.set('aircraftType', aircraft.aircraftType);
    this.set('safetyRating', aircraft.safetyRating);
    this.set('description', aircraft.description);
    this.set('yearOfMake', aircraft.yearOfMake);
    this.set('maxPassengers', aircraft.maxPassengers);
    this.set('speedKts', aircraft.speedKts);
    this.set('speedKmh', aircraft.speedKmh);
    this.set('maxRangeKm', aircraft.maxRangeKm);
    this.set('maxRangeNm', aircraft.maxRangeNm);
    this.set('basePrice', aircraft.basePrice);
    this.set('marginPrice', aircraft.marginPrice);
    this.set('status', aircraft.status);
    this.set('airport', aircraft.base);
  },


  populateAirports() {
    var header = {
      Authorization: this.get('securityService').getAuthBearer()
    };

    let paging = this.get('pagingAirport');
    let that = this;

    let keyword = this.get('keywordAirport');
    let param = {
      limit: paging.get('rowPerPage'),
      page: paging.get('current')
    };

    let url = 'airport/' + keyword;
    this.get('requestSender').ajaxGet(url, param, header)
      .then(function (json) {
        paging.set('totalRow', json.count);
        let data = {
          start: (paging.get('current') - 1) * paging.get('rowPerPage'),
          data: json.data
        };
        that.set('airportData', data);
      }, function (reason) {
      });
  },

  doSave() {
    let aircraft = this.get('aircraft');

    let model = this.get('model');
    let registrationNumber = this.get('registrationNumber');
    let aircraftType = this.get('aircraftType');
    let safetyRating = this.get('safetyRating');
    let description = this.get('description');
    let yearOfMake = this.get('yearOfMake');
    let maxPassengers = this.get('maxPassengers');
    let speedKts = this.get('speedKts');
    let speedKmh = this.get('speedKmh');
    let maxRangeKm = this.get('maxRangeKm');
    let maxRangeNm = this.get('maxRangeNm');
    let basePrice = this.get('basePrice');
    let marginPrice = this.get('marginPrice');
    let status = this.get('status');
    let base = this.get('airport');

    if (base == null) {
      let prop = {
        errorMessage: 'Base airport is empty',
        error: true,
        success: false
      };
      this.setProperties(prop);
      return;
    }

    let param = {
      model: model,
      "registrationNumber": registrationNumber,
      "aircraftType": aircraftType,
      "safetyRating": safetyRating,
      "description": description,
      "yearOfMake": parseInt(yearOfMake),
      "maxPassengers": parseInt(maxPassengers),
      "speedKts": parseFloat(speedKts),
      "speedKmh": parseFloat(speedKmh),
      "maxRangeKm": parseFloat(maxRangeKm),
      "maxRangeNm": parseFloat(maxRangeNm),
      "basePrice": parseFloat(basePrice),
      "marginPrice": parseFloat(marginPrice),
      "status": status,
      "base": {
        "id": base.id
      }
    };


    var header = {
      Authorization: this.get('securityService').getAuthBearer()
    };

    let that = this;

    if (aircraft == null) {
      var url = 'aircraft';
      this.get('request-sender').ajaxPost(url, JSON.stringify(param), header)
        .then(function (json) {
          let prop = {
            errorMessage: 'Aircraft saved',
            error: false,
            success: true
          };
          that.setProperties(prop);

          let redirectRoute = 'main.aircraft.index';
          Ember.run.later(that, function () {
            that.transitionToRoute(redirectRoute);
          }, 500);

        }, function (reason) {
          let prop = {
            errorMessage: reason.xhr.responseText,
            error: true,
            success: false
          };
          that.setProperties(prop);
        });
    } else {
      var url = 'aircraft/' + aircraft.id;
      this.get('request-sender').ajaxPut(url, JSON.stringify(param), header)
        .then(function (json) {
          let prop = {
            errorMessage: 'Aircraft saved',
            error: false,
            success: true
          };
          that.setProperties(prop);

          let redirectRoute = 'main.aircraft.detail';
          Ember.run.later(that, function () {
            that.transitionToRoute(redirectRoute, aircraft.id);
          }, 500);

        }, function (reason) {
          let prop = {
            errorMessage: reason.xhr.responseText,
            error: true,
            success: false
          };
          that.setProperties(prop);
        });
    }
  },

  actions: {

    //airport search
    expandAirportSearch() {
      this.set('airportSearchMode', true);
      if (this.get('paging')) {
        this.populateAirports();
      }
    },

    collapseAirportSearch() {
      this.set('airportSearchMode', false);
    },


    selectAirport(airport) {
      this.set('airport', airport);
    },

    refreshAirport() {
      this.populateAirports();
    },

    doSearchAirport() {
      this.populateAirports();
    },

    save() {
      this.doSave();
    },

    cancel() {
      let aircraft = this.get('aircraft');
      if (aircraft == null) {
        this.transitionToRoute('main.aircraft.index');
      } else {
        this.transitionToRoute('main.aircraft.detail', aircraft.id);
      }
    },

    selectAircraftType(type) {
      this.set('aircraftType', type);
    },

    selectStatus(status) {
      this.set('status', status);
    },

    selectAirport(airport) {
      this.set('airport', airport);
    },


    refreshOperator() {

    },

    refreshAirport() {

    },

    speedKtsChange() {
      let speedKts = this.get('speedKts');
      this.set('speedKmh', UnitUtil.knotToKm(speedKts, 2));
    },

    speedKmhChange() {
      let speedKmh = this.get('speedKmh');
      this.set('speedKts', UnitUtil.kmToKnot(speedKmh, 2));
    },

    maxRangeNmChange() {
      let maxRangeNm = this.get('maxRangeNm');
      this.set('maxRangeKm', UnitUtil.knotToKm(maxRangeNm, 2));
    },
    maxRangeKmChange() {
      let maxRangeKm = this.get('maxRangeKm');
      this.set('maxRangeNm', UnitUtil.kmToKnot(maxRangeKm, 2));
    }

  }
});
