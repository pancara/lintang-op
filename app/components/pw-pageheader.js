import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['page-header'],
  componentIconName: 'icon',
  actions: {
    requestLogout() {
      var pos = this.$('.btn-logout').offset();
      var confirm = window.confirm('Logout ?');
      if (confirm) {
        this.sendAction('logout');
      }
    },

    iconMenuItemSelect(param1, param2) {
      let route = 'main.' + param1;
      this.sendAction('selectRoute', route, param2);
    },

    actionChangePassword() {
      this.sendAction('changePassword');
    },
    actionLogout() {
      this.sendAction('logout');
    }
  }
});
