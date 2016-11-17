import Ember from 'ember';

export default Ember.Service.extend({
  get(url) {
    return new Ember.RSVP.Promise(function (resolve, reject) {

      Ember.$.ajax(url, {
        success: function (response) {
          resolve(response);
        },
        error: function (reason) {
          reject(reason);
        }
      });
    });
  }
});
