import Ember from 'ember'
import ArrayUtil from '../../../../utils/array-util';

export default Ember.Controller.extend({

  dataStub: Ember.inject.service('datastub'),
  uiService: Ember.inject.service('ui-service'),
  cryptService: Ember.inject.service('crypt-service'),
  securityService: Ember.inject.service('security-service'),
  requestSender: Ember.inject.service('requestSender'),

  aircraftDetailCtrl: Ember.inject.controller('main.aircraft.detail'),

  error: false,
  errorMessage: 'Error',
  success: false,

  afterRender() {
    this.populateAircraftAmenities();
  },

  reset() {
    this.set('aircraft', null);

    this.set('error', false);
    this.set('success', false);
  },

  populateAircraftAmenities() {
    var header = {
      Authorization: this.get('securityService').getAuthBearer()
    };

    let modelParam = this.get('aircraftDetailCtrl').get('modelParam');
    let url = 'aircraft/' + modelParam.id;

    let that = this;
    this.get('request-sender').ajaxGet(url, null, header)
      .then(function (json) {
        that.set('amenities', json.amenities);
      }, function (reason) {
      });
  },

  populateAvailableAmenities() {
    var header = {
      Authorization: this.get('securityService').getAuthBearer()
    };

    let paging = this.get('paging');
    paging.set('rowPerPage', 20);
    let that = this;
    let param = {
      limit: paging.get('rowPerPage'),
      page: paging.get('current')
    };

    Ember.$.extend(param, this.get('filter'));
    this.get('request-sender').ajaxGet('config/amenities', param, header)
      .then(function (json) {
        paging.set('totalRow', json.count);
        let amenitiesList = {
          start: (paging.get('current') - 1) * paging.get('rowPerPage'),
          data: json.data
        };
        that.set('amenitiesList', amenitiesList);
      }, function (reason) {
      });
  },

  actions: {

    hideAmenityList() {
      this.set('selectingAmenity', false);
    },

    showAmenityList() {
      this.set('selectingAmenity', true);
      let that = this;

      Ember.run.later(this, function () {
        let paging = that.get('paging');
        if (paging != null) {
          paging.addObserver('current', that, that.populateAvailableAmenities);
        }
        that.populateAvailableAmenities();
      });
    },

    deleteAmenity(amenity) {
      if (!this.get('uiService').confirm('Remove amenity ?')) {
        return;
      }

      let modelParam = this.get('aircraftDetailCtrl').get('modelParam');

      let header = {
        Authorization: this.get('securityService').getAuthBearer()
      };

      let url = 'aircraft/amenities/' + modelParam.id + '/' + amenity.id;

      let that = this;
      this.get('requestSender').ajaxDelete(url, null, header)
        .then(function (json) {
          Ember.set(that, 'amenities', ArrayUtil.removeObject(that.get('amenities'), amenity))
        }, function (reason) {
          that.get('uiService').showMessage('Delete amenity failed. [' + reason.xhr.responseText + ']')
        });
    },

    addAmenity(amenity) {
      var header = {
        Authorization: this.get('securityService').getAuthBearer()
      };

      let modelParam = this.get('aircraftDetailCtrl').get('modelParam');
      let url = 'aircraft/amenities/' + modelParam.id;

      let param = {
        "amenitiesId": [
          amenity.id
        ]
      };

      let that = this;
      this.get('requestSender').ajaxPost(url, JSON.stringify(param), header)
        .then(function (json) {
          that.get('amenities').pushObject(amenity);
          that.get('uiService').showMessage('Amenity added');
        }, function (reason) {
          that.get('uiService').showMessage('Add amenitiy failed. [' + reason.xhr.responseText + ']')
        });
    },

    refresh() {
      this.populateAvailableAmenities();
    }
  }
});
