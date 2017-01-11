import Ember from 'ember';


export default Ember.Controller.extend({
  dataStub: Ember.inject.service('datastub'),
  securityService: Ember.inject.service('security-service'),
  requestSender: Ember.inject.service('request-sender'),

  operatorUserProfileCtrl: Ember.inject.controller('main.operator-user-profile'),

  init() {
    this.set('menus', this.get('dataStub').getMainMenu());
  },

  getUserProfile() {
    let that = this;
    var header = {
      'Authorization': that.get('securityService').getAuthBearer()
    };

    this.get('requestSender').ajaxGet('operatoruser/profile', null, header)
      .then(function (user) {
        that.set('user', user);
      }, function (reason) {
      });
  },

  actions: {
    selectRoute(routeName, param) {
      if (param === undefined) {
        this.transitionToRoute(routeName);
      } else {
        this.transitionToRoute('main', param);
      }
    },

    operatorUserProfile() {
      this.get('operatorUserProfileCtrl').set('user', this.get('user'));
      this.transitionToRoute('main.operator-user-profile');
    },

    changePassword() {
      this.transitionToRoute('main.change-password');
    },

    refreshToken() {
      var header = {
        'Authorization': this.get('securityService').getRefreshTokenBasic()
      };

      var promise = this.get('requestSender').ajaxGet('token', null, header);
      let that = this;
      promise.then(function (json) {
        that.get('securityService').saveAccessToken(json);
      }, function () {
      });
    },

    // logout action
    logout() {
      var header = {
        'Authorization': this.get('securityService').getAuthBearer()
      };
      let that = this;

      this.get('requestSender').ajaxDelete('authenticate', null, header)
        .then(function () {
          that.get('securityService').doLogout();
        }, function () {
        });
      this.transitionToRoute('login');
    }
  }
});
