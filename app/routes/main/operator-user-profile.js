import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller, model) {
    controller.getCurrentUserOperator();
    controller.populateLookups();
  }
});
