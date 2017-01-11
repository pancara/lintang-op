import Ember from 'ember'

export default Ember.Controller.extend({
  securityService: Ember.inject.service('security-service'),
  requestSender: Ember.inject.service('request-sender'),
  dataStub: Ember.inject.service('datastub'),

  editMode: false,
  operator: null,

  operatorName: null,
  operatorDescription: null,
  operatorContactName: null,
  operatorContactPhone: null,
  operatorContactMail: null,
  operatorBankInfo: {
    branch: null,
    account: null,
    name: null,
    bank: {
      id: null
    }
  },

  init() {
    this._super();
    this.addObserver('operator', this, this.operatorChange);
  },

  populateBank() {
    let header = {
      Authorization: this.get('securityService').getAuthBearer()
    };

    let that = this;
    this.get('request-sender').ajaxGet('info/bank', null, header)
      .then(function (json) {
        let banks = [];
        for (var i = 0; i < json.length; i++) {
          var bank = {
            id: json[i].id,
            code: json[i].code,
            name: json[i].name,
            text: json [i].code + '  ' + json[i].name
          }
          banks.push(bank);
        }
        that.set('banks', banks);
      }, function (reason) {
      });
  },

  getCurrentOperator() {
    let header = {
      'Authorization': this.get('securityService').getAuthBearer()
    };

    let that = this;
    this.get('requestSender').ajaxGet('operator/profile', null, header)
      .then(function (json) {
        that.set('operator', json);
      }, function () {
      });
  },

  operatorChange() {
    let operator = this.get('operator');

    this.set('operatorName', operator == null ? null : operator.name);
    this.set('operatorDescription', operator == null ? null : operator.description);
    this.set('operatorContactName', operator == null ? null : operator.contactName);
    this.set('operatorContactPhone', operator == null ? null : operator.contactPhone);
    this.set('operatorContactMail', operator == null ? null : operator.contactMail);

    if (operator == null || operator.bankInfo == null) {
      this.set('operatorBankInfo', {bank: {}});
    } else {
      this.set('operatorBankInfo.branch', operator.bankInfo.branch);
      this.set('operatorBankInfo.account', operator.bankInfo.account);
      this.set('operatorBankInfo.name', operator.bankInfo.name);
      if (operator.bankInfo != null) {
        this.set('operatorBankInfo.bank.id', operator.bankInfo.bank.id);
      }
    }

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
        name: this.get('operatorName'),
        description: this.get('operatorDescription'),
        contactName: this.get('operatorContactName'),
        contactPhone: this.get('operatorContactPhone'),
        contactMail: this.get('operatorContactMail'),
        bankInfo: {
          branch: this.get('operatorBankInfo.branch'),
          account: this.get('operatorBankInfo.account'),
          name: this.get('operatorBankInfo.name'),
          bank: {
            id: this.get('operatorBankInfo.bank.id')
          }
        }
      };


      let header = {
        'Authorization': that.get('securityService').getAuthBearer()
      };

      this.get('requestSender').ajaxPut('operatoruser/profile', JSON.stringify(params), header)
        .then(function (json) {
          that.set('editMode', false);
          that.getCurrentOperator();
        }, function () {
        });
    },

    cancel() {
      this.set('editMode', false);
    },

    selectBank(bankId) {
      this.set('operatorBankInfo.bank.id', bankId);
    }
  }
});
