import Ember from 'ember';
import TabButton from '../../../objects/component/tab-button';

export default Ember.Controller.extend({
  init() {
    let buttons = [];
    buttons.push(TabButton.create({
      caption: 'ACTIVE BOOKING',
      route: 'main.booking.active',
      active: false
    }));

    buttons.push(TabButton.create({
      caption: 'HISTORY BOOKING',
      route: 'main.booking.history',
      active: false
    }));

    this.set('buttons', buttons);
  },

  actions: {
    buttonClick(button) {
      this.transitionToRoute(button.route);
    }
  }
});
