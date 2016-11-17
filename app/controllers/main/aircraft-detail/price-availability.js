import Ember from 'ember';

export default Ember.Controller.extend({
  month: 10,
  year: 2016,
  init() {
    this._super(...arguments);

    let date = new Date();
    this.set('month', date.getMonth());
    this.set('year', date.getFullYear());

    this.populateMarkedDates();
  },

  populateMarkedDates() {
    var markedDates = [];

    let month = this.get('month');
    let year = this.get('year');

    for (var i = 1; i < 30; i++) {
      if (i % 4 === 0) {
        var date = new Date(year, month, i);
        markedDates.push(date);
      }
    }

    this.set('markedDates', markedDates);
  },
  actions: {
    selectDate(date) {
      this.set('selectedDate', date);
    },
    nextMonth() {
      var month = this.get('month');
      var year = this.get('year');
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
      console.log('next');
      console.log(month);
      console.log(year);

      this.setProperties({
        month: month,
        year: year
      });
    },

    previousMonth() {
      console.log('previous');
      var month = this.get('month');
      var year = this.get('year');
      month--;
      if (month < 0) {
        month = 11;
        year--;
      }

      console.log(month);
      console.log(year);
      this.setProperties({
        month: month,
        year: year
      });

    }
  }
});
