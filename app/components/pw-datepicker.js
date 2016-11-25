import Ember from 'ember';

import RegisterAsComponent from '../mixins/register-as-component';

export default Ember.Component.extend(RegisterAsComponent, {
  classNames: ['input-group', 'date'],
  value: new Date(),
  $datepicker: null,

  didRender() {
    var that = this;

    var $datepicker = this.$('input').datepicker('update', this.get('date'))
      .on('changeDate', function (e) {
        console.log('change Date');
        that.set('value', e.date);
      }).on('show', function (e) {
        console.log('on show');
        //var value = that.get('date');
        //that.$datepicker.datepicker('update', value);
      });

    this.set('$datepicker', $datepicker);

  },
  actions: {
    pickDate() {
      this.$datepicker.datepicker('setDate', this.get('value'));
      this.$datepicker.datepicker('show');
    }
  }
});
