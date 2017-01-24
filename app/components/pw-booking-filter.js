import Ember from 'ember';
import RegisterAsComponent from '../mixins/register-as-component';

export default Ember.Component.extend(RegisterAsComponent, {

  dataStub: Ember.inject.service('datastub'),

  classNames: ['panel', 'panel-default', 'panel-filter'],
  classNameBindings: ['shown'],
  shown: true,
  orderNumber: null,
  orderType: null,
  customerMail: null,

  willRender() {
      this.set('orderTypes', this.get('dataStub').getOrderTypes());
  },

  actions: {
    applyFilter() {
      var filter = {
        orderNumber: this.get('orderNumber'),
        orderType: this.get('orderType'),
        customerMail: this.get('customerMail')
      };

      this.sendAction('applyFilter', filter);
    },

    selectOrderType(orderType) {
      this.set('orderType', orderType);
    }
  }
});
