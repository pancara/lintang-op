import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['row', 'booking-detail'],
  actions: {
    decline() {
      this.sendAction('onDecline', this.get('booking'));

    }
  }
});
