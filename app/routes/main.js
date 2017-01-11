import Ember from 'ember';
import BaseRoute from '../mixins/route-base';
export default Ember.Route.extend(BaseRoute, {

  setupController(controller, model) {
    controller.getUserProfile();
  },

  actions: {
    willTransition(transition) {
      let targetName = transition.targetName;

      if (targetName.startsWith('main.booking')) {
        if (targetName !== 'main.booking.index') {
          this.controllerFor('main.booking').set('inChildRoute', true);
        } else {
          this.controllerFor('main.booking').set('inChildRoute', false);
        }

      }
    }
  }
});
