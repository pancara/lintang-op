import Ember from 'ember';

export default Ember.Controller.extend({
  hasError: false,
  success: false,
  rememberMe: false,

  reset() {
    this.set('hasError', false);
    this.set('success', false);
    this.set('rememberMe', false);

    var rememberMeData = this.get('storage-service').loadRememberMe();

    if (rememberMeData != null && rememberMeData.rememberMe) {
      this.set('userId', rememberMeData.userId);
      this.set('password', rememberMeData.password);
      this.set('rememberMe', rememberMeData.rememberMe);
    } else {
      this.set('userId', null);
      this.set('password', null);
      this.set('rememberMe', false);
    }
  },

  actions: {
    doLogin(userId, password) {

      var promise = this.get('request-sender').ajaxGet('login.json', {
        userId: userId,
        password: password
      });

      let that = this;
      promise.then(function (json) {
        if (json.status === 'SUCCESS') {
          that.set('hasError', false);
          that.set('success', true);
          that.set('errorMessage', 'Redirecting to secured area...');

          if (that.get('rememberMe')) {
            var rememberMeData = {
              userId: userId,
              password: password,
              rememberMe: true
            }
            that.get('storage-service').saveRememberMe(rememberMeData);
          } else {
            that.get('storage-service').removeRememberMe();
          }

          Ember.run.later(this, function () {
            that.transitionToRoute('main.booking.active');
          }, 1500);
        } else {
          that.set('hasError', true);
          that.set('success', false);
          that.set('errorMessage', 'Invalid credentials');
        }
      }, function () {
        console.log('error...');
      });
    }
  }
});
