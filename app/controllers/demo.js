import Ember from 'ember';

export default Ember.Controller.extend({
  month: 10,
  year: 2016,
  data: [],
  inProgress:false,
  init() {
    this._super(...arguments);
    var markedDates = [];
    for (var i = 1; i < 12; i++) {
      var date = new Date(2016, 10, i);
      console.log(date);
      markedDates.push(new Date(2016, 10, i));
    }

    this.set('markedDates', markedDates);
  },
  actions: {

    selectDate(date) {
      this.set('selectedDate', date);
    },
    addData() {
      this.get('data').push(new Date());
    },

    animate() {
      this.set('inProgress', true);
      var callback = this.get('ui-service').transitionEventCallback();
      var that = this;
      $('.demo-anim')
        .removeClass('start-anim')
        .removeClass('finish-anim')
        .addClass('start-anim')
        .one(callback, function (event) {
          $('.demo-anim').addClass('finish-anim');
          that.set('inProgress', false);
        });

    }
  }
});
