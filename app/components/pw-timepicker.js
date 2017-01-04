import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['input-group', 'pw-timepicker'],
  value: new Date(),
  $timepicker: null,

  didRender() {
    var that = this;

    var $timepicker = this.$('input').timepicker({
      minuteStep: 1,
      showMeridian: false,
      maxHours: 24
    });

    $timepicker.timepicker('setTime', this.get('value'))
      .on('changeTime.timepicker', function (e) {
        var value = that.get('value');
        value.setHours(e.time.hours);
        value.setMinutes(e.time.minutes);
        value.setSeconds(e.time.seconds);
      }
    );

    this.set('$timepicker', $timepicker);
  },
  actions: {
    showDialog() {
      this.get('$timepicker').timepicker('showWidget');
      console.log('show Dialog');
    }
  }
});
