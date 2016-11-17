import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row', 'lt-aircraft'],
  actions: {
    showDetail(aircraft) {
      this.sendAction('showDetail', aircraft);
    }
  }
});
