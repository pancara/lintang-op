import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super();

    this.createMenus();
    this.populateNotifications();
  },

  createMenus: function () {
    let menus = this.get('datastub').getMainMenu();
    this.set('menus', menus);
  },

  populateNotifications() {
    this.set('notifications', this.get('datastub').getNotifications());
  },

  actions: {
    selectRoute(routeName, param) {
      if (param === undefined) {
        this.transitionToRoute(routeName);
      } else {
        this.transitionToRoute('main.notification.notification-detail', param);
      }
    },

    updateUserProfile() {
      this.transitionToRoute('main.user-profile');
    },

    changePassword() {
      this.transitionToRoute('main.change-password');
    },

    logout() {
      this.transitionToRoute('login');
    }
  }
});
