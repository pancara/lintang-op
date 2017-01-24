import Ember from 'ember';
import JsonUtil from '../../../utils/json-util';

export default Ember.Controller.extend({

  requestSender: Ember.inject.service('request-sender'),
  securityService: Ember.inject.service('security-service'),

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

    let url = 'order/history';
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
    }
  }
});
