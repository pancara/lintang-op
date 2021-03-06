import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  shownDetail: false,
  actions: {
    toggleDetail(booking) {
      this.toggleProperty('shownDetail');
    },
    decline(booking) {
      this.sendAction('onDecline', booking);
    }
  }
});
