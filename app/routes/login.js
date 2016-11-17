import Ember from 'ember';
import BaseRoute from '../mixins/route-base';

export default Ember.Route.extend(BaseRoute, {
  activate() {
    this._super();
    this.controllerFor('login').reset();
  }
});
