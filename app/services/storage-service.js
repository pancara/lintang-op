import Ember from 'ember';

export default Ember.Service.extend({
  salt: 'lintang-op',
  rememberMeKey: 'lintang-op.rememberMe',
  sessionKey: 'lintang-op.session',

  saveRememberMe(json) {
    this.save(this.get('rememberMeKey'), json);
  },

  loadRememberMe() {
    return this.load(this.get('rememberMeKey'));
  },

  removeRememberMe() {
    this.remove(this.get('rememberMeKey'));
  },

  saveSession(json) {
    this.save(this.get('sessionKey'), json);
  },

  loadSession() {
    return this.load(this.get('sessionKey'));
  },

  removeSession() {
    this.remove(this.get('sessionKey'));
  },

  save(key, value) {
    var jsonText = JSON.stringify(value);
    localStorage.setItem(key, this.encrypt(jsonText));
  },

  load(key) {
    var cypherText = localStorage.getItem(key);
    if (cypherText == null) {
      return null;
    }

    var plain = this.decrypt(cypherText);
    return JSON.parse(plain);
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  encrypt(plain) {
    return CryptoJS.AES.encrypt(plain, this.get('salt')).toString();
  },

  decrypt(crypt) {
    return CryptoJS.AES.decrypt(crypt, this.get('salt')).toString(CryptoJS.enc.Utf8);
  }


});
