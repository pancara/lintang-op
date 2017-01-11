import Ember from 'ember'

export default Ember.Controller.extend({
  dataStub: Ember.inject.service('datastub'),
  uiService: Ember.inject.service('ui-service'),
  cryptService: Ember.inject.service('crypt-service'),
  securityService: Ember.inject.service('security-service'),
  requestSender: Ember.inject.service('requestSender'),

  aircraftDetailCtrl: Ember.inject.controller('main.aircraft.detail'),

  images: [],

  error: false,
  errorMessage: 'Error',
  success: false,

  afterRender() {
    this.populateAircraftImages();
    this.set('modelParam', this.get('aircraftDetailCtrl').get('modelParam'))
  },

  reset() {
    this.set('error', false);
    this.set('success', false);
  },

  populateAircraftImages() {
    var header = {
      Authorization: this.get('securityService').getAuthBearer()
    };

    let modelParam = this.get('aircraftDetailCtrl').get('modelParam');
    let url = 'aircraft/' + modelParam.id;

    let that = this;
    this.get('request-sender').ajaxGet(url, null, header)
      .then(function (json) {
        that.set('images', json.images);
      }, function (reason) {
      });
  },

  actions: {

    uploadCompleted() {
      let that = this;

      Ember.run.later(this, function () {
        that.populateAircraftImages();
      });
    },

    deleteImage(image) {
      if (!this.get('uiService').confirm('Remove aircraft picture ?')) {
        return;
      }

      var header = {
        Authorization: this.get('securityService').getAuthBearer()
      };

      let modelParam = this.get('aircraftDetailCtrl').get('modelParam');
      let that = this;
      let url = 'aircraft/image/' + image.id;

      this.get('requestSender').ajaxDelete(url, null, header)
        .then(function (json) {
          that.populateAircraftImages();
        }, function (reason) {
          that.get('uiService').showMessage('Delete image failed. [' + reason.xhr.responseText + ']')
        });
    },

    setMainImage(image) {
      var header = {
        Authorization: this.get('securityService').getAuthBearer()
      };

      let that = this;
      let url = 'aircraft/image/' + image.id;

      this.get('requestSender').ajaxPut(url, null, header)
        .then(function (json) {
          that.populateAircraftImages();
          that.get('uiService').showMessage('Aircraft main image changed');
        }, function (reason) {
          that.get('uiService').showMessage('Set aircraft main image failed. [' + reason.xhr.responseText + ']')
        });
    }
  }
});
