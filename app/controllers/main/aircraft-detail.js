import Ember from 'ember';
import TabButton from '../../objects/component/tab-button';

export default Ember.Controller.extend({
  init() {
    let buttons = [];
    buttons.push(TabButton.create({
      caption: 'AIRCRAFT DETAIL',
      route: 'main.aircraft-detail.view',
      active: false
    }));

    buttons.push(TabButton.create({
      caption: 'PRICE & AVAILABILITY',
      route: 'main.aircraft-detail.price-availability',
      active: false
    }));

    this.set('buttons', buttons);

    this.addObserver('activeRoute', this.onActiveRouteChange);
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
