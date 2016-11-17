import Ember from 'ember';
import TabButton from '../../objects/component/tab-button';

export default Ember.Controller.extend({
  activeRoute: null,

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

    this.addObserver('activeRoute', this.onActiveRouteChange);
  },

  willDestroy() {
    this.removeObserver('activeRoute', this.onActiveRouteChange);
  },

  onActiveRouteChange() {
    let activeRoute = this.get('activeRoute');
    this.buttons.forEach(function (button) {
      button.set('active', button.route === activeRoute);
    });
  },

  actions: {
    buttonClick(button) {
      this.transitionToRoute(button.route);
    }
  }
});
