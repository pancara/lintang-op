import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['row', 'booking'],
  classNameBindings: ['shownDetail'],
  shownDetail: false,
  actions: {
    toggleDetail() {
      this.sendAction('toggleDetail', this.get('booking'));
    }
  }
});
