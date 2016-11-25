import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNameBindings: ['className'],
  didReceiveAttrs() {
  },
  didInsertElement() {
    var chartData = this.get('data');
    var el = this.$('.chart');
    var chart = new Chart(el, chartData);
  }
});
