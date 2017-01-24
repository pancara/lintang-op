import Ember from 'ember';
import JsonUtil from '../../../utils/json-util';

export default Ember.Controller.extend({

  requestSender: Ember.inject.service('request-sender'),
  securityService: Ember.inject.service('security-service'),
  uiService: Ember.inject.service('ui-service'),

  filter: {},
  filterShown: false,

  init() {
  },

  afterRender() {
    this.retrieveData();
  },

  retrieveData() {
    var header = {
      Authorization: this.get('securityService').getAuthBearer()
    };

    let paging = this.get('paging');
    let that = this;
    let filter = this.get('filter');
    let param = {
      number: filter.orderNumber,
      orderType: filter.orderType,
      customerMail: filter.customerMail,
      limit: paging.get('rowPerPage'),
      page: paging.get('current')
    };

    let url = 'order/active';
    this.get('request-sender').ajaxGet(url, JsonUtil.cleanEmptyProperty(param), header)
      .then(function (json) {
        paging.set('totalRow', json.count);
        let data = {
          start: (paging.get('current') - 1) * paging.get('rowPerPage'),
          data: json.data
        };
        that.set('data', data);
      }, function (reason) {
      });
  },

  approveBooking(booking) {
    var header = {
      Authorization: this.get('securityService').getAuthBearer()
    };

    let url = 'order/confirm/' + booking.id;
    let that = this;
    this.get('request-sender').ajaxPut(url, null, header)
      .then(function (json) {
        that.retrieveData();
      }, function (reason) {
        that.get('uiService').showMessage(reason.xhr.responseText);
      });
  },

  declineBooking(booking) {
    var header = {
      Authorization: this.get('securityService').getAuthBearer()
    };

    let url = 'order/' + booking.id;
    let that = this;
    this.get('request-sender').ajaxPut(url, null, header)
      .then(function (json) {
        that.retrieveData();
      }, function (reason) {
        that.get('uiService').showMessage(reason.xhr.responseText);
      });
  },

  actions: {
    toggleFilter() {
      this.toggleProperty('filterShown');
    },

    refresh() {
      this.retrieveData();
    },

    applyFilter(filter) {
      this.set('filter', filter);
      let paging = this.get('paging');
      if (paging.get('current') === 1) {
        this.retrieveData();
      } else {
        paging.set('current', 1);
      }
    },

    approveBooking(booking) {
      let confirm = this.get('uiService').confirm('Approve booking ?');
      if (confirm) {
        this.approveBooking(booking);
      }
    },

    declineBooking(booking) {
      let confirm = this.get('uiService').confirm('Decline booking ?');
      if (confirm) {
        this.declineBooking(booking);
      }
    }
  }
});
