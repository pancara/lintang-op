import Ember from 'ember';
import DateUtil from '../utils/date-util';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['pw-month-calendar'],
  month: DateUtil.currentMonth(),
  year: DateUtil.currentYear(),
  markedDates: [],
  monthNavigation: false,

  init() {
    this._super(...arguments);
    this.addObserver('month', this, this.buildCalendar);
    this.addObserver('year', this, this.buildCalendar);
  },

  didReceiveAttrs() {
    this.buildCalendar();
  },

  buildCalendar() {
    let month = this.get('month');
    let year = this.get('year');

    var date = new Date(year, month, 1);
    date.setDate(date.getDate() - date.getDay());

    var index = 0;
    let calendar = [];
    while (true) {
      if (index === 0) {
        var days = [];
        calendar.push(days);
      }

      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
      index++;
      if (index === 7) {
        index = 0;
      }
      if (date.getDay() === 0) {
        if ((date.getFullYear() > year) || (date.getMonth() > month)) {
          break;
        }
      }
    }

    this.set('calendar', calendar);
    this.sendAction('monthYearChanged');
  },

  actions: {
    clickDate(date) {
      this.sendAction('selectDate', date);
    },

    nextMonth() {
      var month = this.get('month');
      var year = this.get('year');
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
      this.setProperties({
        month: month,
        year: year
      });

    },

    previousMonth() {
      var month = this.get('month');
      var year = this.get('year');
      month--;
      if (month < 0) {
        month = 11;
        year--;
      }

      this.setProperties({
        month: month,
        year: year
      });
    }

  }
});
