import Ember from 'ember';
import RegisterAsComponent from '../mixins/register-as-component';

export default Ember.Component.extend(RegisterAsComponent, {
  classNames: ['form-login'],

  keydown() {
    console.log('key down..');
  },

  actions: {
    keyDown() {
      console.log('key down');
    },
    submit() {
      let userId = this.get('userId');
      let password = this.get('password');
      this.sendAction('doLogin', userId, password);
    }
  }
});
