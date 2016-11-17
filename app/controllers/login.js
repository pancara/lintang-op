import Ember from 'ember';

export default Ember.Controller.extend({
  hasError: false,
  success: false,
  rememberMe: false,
  reset() {
    this.set('hasError', false);
    this.set('success', false);
    this.set('rememberMe', false);
  },
  actions: {
    doLogin(operatorId, userId, password) {
      let userService = this.get('user-service');
      if (userService.authenticate(operatorId, userId, password)) {
        this.set('hasError', false);
        this.set('success', true);
        this.set('errorMessage', 'Redirecting to main page...');
        var that = this;
        Ember.run.later(this, function () {
          that.transitionToRoute('main');
        }, 1500);
      } else {
        this.set('hasError', true);
        this.set('success', false);
        this.set('errorMessage', 'Invalid credentials');
      }
    }
  }
});
