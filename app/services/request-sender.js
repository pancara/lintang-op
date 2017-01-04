import Ember from 'ember';

export default Ember.Service.extend({
  baseUrl: 'json/',
  requestCount: 0,

  getHeader() {
    return {
      data: 'xxxx'
    }
  },

  getFullURL(url) {
    return this.get('baseUrl') + url;
  },

  ajaxGet(url, data) {
    return this.ajax(url, 'get', data);
  },

  ajaxPost(url, data) {
    return this.ajax(url, 'post', data);
  },

  ajax(url, method, data) {
    this.incrementProperty('requestCount');
    var that = this;
    var fullURL = this.getFullURL(url);

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(fullURL, {
        method: method,
        header: that.getHeader(),
        data: data,

        success(response) {
          resolve(response);
        },

        error(xhr, textStatus, error) {
          var reason = {
            xhr: xhr,
            text: textStatus,
            error: error
          };
          reject(reason);
        },

        complete() {
          Ember.run.later(function () {
            var requestCount = that.get('requestCount');
            if (requestCount > 0) {
              that.decrementProperty('requestCount');
            }
          }, 1000);
        }
      });
    });

  }
});
