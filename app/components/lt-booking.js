import Ember from 'ember';

export default Ember.Component.extend({
  shownDetail: false,
  actions: {
    toggleDetail(booking) {
      this.toggleProperty('shownDetail');
    }
  }
});
