import Ember from 'ember';
import Aircraft from '../../objects/aircraft';

export default Ember.Route.extend({

  activate() {
    console.log('activate');
  },

  model(params) {
    let aircraft = this.get('aircraft');
    return Aircraft.create({
      id: params.id,
      name: 'Aircraft number :' + params.id
    });
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    let aircraft = this.get('datastub').findAircraftById(model.id);
    controller.set('aircraft', aircraft);
  }

});
