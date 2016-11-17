import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-login'],
  operatorId: null,
  userId: null,
  password: null,
  rememberMe: false,

  keydown() {
    console.log('key down..');
  },
  actions: {
    keyDown() {
      console.log('key down');
    },
    submit() {
      console.log('trigger login');
      let operatorId = this.get('operatorId');
      let userId = this.get('userId');
      let password = this.get('password');
      this.sendAction('doLogin', operatorId, userId, password);
    }
  }
});
