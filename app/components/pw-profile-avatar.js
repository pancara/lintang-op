import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['profile'],
  classNameBindings: ['shownMenu'],
  attributeBindings: ['tabindex'],
  shownMenu: false,
  tabindex: 0,

  focusOut() {
    console.log('focus out');
    this.set('shownMenu', false);
  },

  actions: {
    showMenu() {
      this.set('shownMenu', true);
    },

    logout() {
      this.set('shownMenu', false);
      this.sendAction('actionLogout');
    },
    changePassword() {
      this.set('shownMenu', false);
      this.sendAction('actionChangePassword');
    }

  }

});
