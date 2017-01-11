import Ember from 'ember';
import TabButton from'../../../objects/component/tab-button';
import AircraftUtil from'../../../utils/aircraft-util';

export default Ember.Controller.extend({
  requestSender: Ember.inject.service('request-sender'),
  securityService: Ember.inject.service('security-service'),
  uiService: Ember.inject.service('ui-service'),

  indexCtrl: Ember.inject.controller('main.aircraft.index'),
  aircraftFormCtrl: Ember.inject.controller('main.aircraft.form'),
  aircraft: null,

  init() {
    this.set('buttons', this.createTabButtons());
    this.addObserver('modelParam', this, this.retrieveAircraft);
  },

  createTabButtons() {
    let buttons = [];

    buttons.push(TabButton.create({
      caption: 'IMAGES',
      route: 'main.aircraft.detail.images',
      active: false
    }));

    buttons.push(TabButton.create({
      caption: 'AVAILABILITY',
      route: 'main.aircraft.detail.availability',
      active: false
    }));

    buttons.push(TabButton.create({
      caption: 'AMENITIES',
      route: 'main.aircraft.detail.amenities',
      active: false
    }));

    buttons.push(TabButton.create({
      caption: 'SPECIAL PRICE',
      route: 'main.aircraft.detail.special-price',
      active: false
    }));
    return buttons;
  },


  retrieveAircraft() {
    let modelParam = this.get('modelParam');
    let header = {
      Authorization: this.get('securityService').getAuthBearer()
    };

    let url = 'aircraft/' + modelParam.id;
    let that = this;
    this.get('requestSender').ajaxGet(url, null, header)
      .then(function (json) {
        AircraftUtil.setAircraftMainImage(json);
        that.set('aircraft', json);
      }, function (reason) {

      });
  },

  doDelete() {
    if (!this.get('uiService').confirm('Delete aircraft ?')) {
      return;
    }

    var header = {
      Authorization: this.get('securityService').getAuthBearer()
    };

    let that = this;
    let modelParam = this.get('modelParam');
    let url = 'aircraft/' + modelParam.id;
    this.get('requestSender').ajaxDelete(url, null, header)
      .then(function (json) {
        that.transitionToRoute('main.aircraft');
      }, function (reason) {
        that.get('uiService').showMessage('Delete aircraft failed. [' + reason.xhr.responseText + ']')
      });
  },

  actions: {
    tabButtonClick(tabButton) {
      this.transitionToRoute(tabButton.route, this.get('modelParam').id);
    },

    refresh() {
      this.retrieveAircraft();
    },

    edit() {
      this.get('aircraftFormCtrl').edit(this.get('aircraft'));
      this.transitionToRoute('main.aircraft.form');
    },

    delete() {
     this.doDelete();
    }

  }
});
