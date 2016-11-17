import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.modelFor('main.aircraft-detail');
  },

  activate() {
    this.controllerFor('main.aircraft-detail')
      .set('activeRoute', 'main.aircraft-detail.view');
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    let aircraft = this.get('datastub').findAircraftById(model.id);
    controller.set('aircraft', aircraft);
  }
});
