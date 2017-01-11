import Ember from 'ember'

export default Ember.Controller.extend({
  securityService: Ember.inject.service('security-service'),
  requestSender: Ember.inject.service('request-sender'),
  dataStub: Ember.inject.service('datastub'),

  mainCtrl: Ember.inject.controller('main'),
  editMode: false,
  firstName: null,
  lastName: null,
  gender: null,

  init() {
    this._super(...arguments);
    this.addObserver('user', this, this.userChange);
  },

  getCurrentUserOperator() {
    this.set('user', this.get('mainCtrl').get('user'));
  },

  userChange() {
    let user = this.get('user');

    this.set('firstName', user == null ? null : user.firstName);
    this.set('lastName', user == null ? null : user.lastName);
    this.set('gender', user == null ? null : user.gender);
  },

  populateLookups() {
    this.set('genders', this.get('dataStub').getGenders());
  },

  actions: {
    selectGender(gender) {
      this.set('gender', gender);
    },

    edit() {
      this.set('editMode', true);
    },

    save() {
      let that = this;
      let params = {
        firstName: this.get('firstName'),
        lastName: this.get('lastName'),
        gender: this.get('gender')
      };

      let header = {
        'Authorization': that.get('securityService').getAuthBearer()
      };

      this.get('requestSender').ajaxPut('operatoruser/profile', JSON.stringify(params), header)
        .then(function (json) {
          that.set('editMode', false);
          that.set('user.firstName', params.firstName);
          that.set('user.lastName', params.lastName);
          that.set('user.gender', params.gender);

          that.get('mainCtrl').getUserProfile();
        }, function () {
        });
    },

    cancel() {
      this.set('editMode', false);
    }
  }
});
