import Ember from 'ember';
import AircraftUtil from'../../../utils/aircraft-util';

export default Ember.Controller.extend({
  securityService: Ember.inject.service('security-service'),
  requestSender: Ember.inject.service('request-sender'),

  aircraftDetailCtrl: Ember.inject.controller('main.aircraft.detail'),
  aircraftFormCtrl: Ember.inject.controller('main.aircraft.form'),

  afterRender() {
    this.retrieveAircraft();
  },

  retrieveAircraft() {
    let paging = this.get('paging');
    let rowPerPage = paging.get('rowPerPage');
    let page = paging.get('current');

    let header = {
      Authorization: this.get('securityService').getAuthBearer()
    };

    let param = {
      limit: rowPerPage,
      page: page
    };

    let url = 'aircraft';

    let that = this;
    this.get('requestSender').ajaxGet(url, param, header)
      .then(function (json) {
        paging.set('totalRow', json.count);

        // populate mainImage
        for (var i = 0; i < json.data.length; i++) {
          let aircraft = json.data[i];
          AircraftUtil.setAircraftMainImage(aircraft);
        }

        let data = {
          start: (paging.get('current') - 1) * paging.get('rowPerPage'),
          data: json.data
        };
        that.set('data', data);
      }, function (reason) {
      });
  },

  actions: {
    add() {
      this.get('aircraftFormCtrl').reset();
      this.transitionToRoute('main.aircraft.form');
    },

    showDetail(aircraft) {
      this.transitionToRoute('main.aircraft.detail.availability', aircraft.id);
    },

    refresh() {
      this.retrieveAircraft();
    }
  }
});
