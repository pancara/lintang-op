import Ember from 'ember';
import Aircraft from '../../../objects/aircraft';

export default Ember.Route.extend({

  model(params) {
    return {
      id: params.id
    };
  },

  setupController: function (controller, model) {
    controller.set('modelParam', model);
  }

});
