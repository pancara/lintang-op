import Ember from 'ember'
import Operator from '../../../objects/operator';


export default Ember.Controller.extend({
  dataStub: Ember.inject.service('datastub'),
  cryptService: Ember.inject.service('crypt-service'),
  securityService: Ember.inject.service('security-service'),
  requestSender: Ember.inject.service('requestSender'),

  operator: null,
  firstName: null,
  lastName: null,
  gender: null,
  userName: null,
  password: null,
  confirmation: null,

  error: false,
  errorMessage: 'Error',
  success: false,

  afterRender() {
    this.set('genders', this.get('dataStub').getGenders());
    this.set('operatorRoles', this.get('dataStub').getOperatorRoles());
    if (this.get('searchMode')) {
      this.populateOperators();
    }
  },


  populateOperators() {
    var header = {
      Authorization: this.get('securityService').getAuthBearer()
    };

    let paging = this.get('paging');
    let that = this;

    let keyword = this.get('keyword');
    let param = {
      limit: paging.get('rowPerPage'),
      page: paging.get('current'),
      code: keyword
    };

    let url = 'operator';
    this.get('requestSender').ajaxGet(url, param, header)
      .then(function (json) {
        paging.set('totalRow', json.count);
        let data = {
          start: (paging.get('current') - 1) * paging.get('rowPerPage'),
          data: json.data
        };
        that.set('data', data);
      }, function (reason) {
      });
  },

  reset() {
    this.set('firstName', null);
    this.set('lastName', null);
    this.set('gender', null);
    this.set('username', null);
    this.set('password', null);
    this.set('confirm', null);
    this.set('role', null);

    this.set('error', false);
    this.set('success', false);
  },

  actions: {

    save() {
      let firstName = this.get('firstName');
      let lastName = this.get('lastName');
      let gender = this.get('gender');
      let username = this.get('username');
      let password = this.get('password');
      let confirmation = this.get('confirmation');
      let role = this.get('role');

      if (password === confirmation) {
        let prop = {
          errorMessage: 'Password does not match.',
          error: true,
          success: false
        };
        this.setProperties(prop);
        return;
      }

      let param = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        username: username,
        subRole: role,
        password: this.get('cryptService').encryptPassword(username, password)
      };

      var header = {
        Authorization: this.get('securityService').getAuthBearer()
      };

      let that = this;
      var url = 'operatoruser/';
      this.get('request-sender').ajaxPost(url, JSON.stringify(param), header)
        .then(function (json) {
          let prop = {
            errorMessage: 'New operator created',
            error: false,
            success: true
          };
          that.setProperties(prop);
          Ember.run.later(that, function () {
            that.transitionToRoute('main.user.index');
          }, 500);

        }, function (reason) {
          let prop = {
            errorMessage: reason.xhr.responseText,
            error: true,
            success: false
          };
          that.setProperties(prop);
        });
    },
    cancel() {
      this.transitionToRoute('main.user.index');
    },

    selectRole(role) {
      this.set('role', role);
    },

    selectGender(gender) {
      this.set('gender', gender);
    }
  }
});
