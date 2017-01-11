import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller, model) {
    controller.setProperties({
      hasError: false,
      success: false,
      rememberMe: false
    });
  }
});
