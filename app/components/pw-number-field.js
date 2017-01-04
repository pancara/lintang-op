import Ember from 'ember';
import RegisterAsComponent from '../mixins/register-as-component';

export default Ember.TextField.extend(RegisterAsComponent, {
  classNames: ['form-control'],
  type: 'number',
  attributeBindings: ['min', 'max', 'step', 'disabled'],

  numericValue: Ember.computed('value', function () {
    var value = this.get('value');

    if (arguments.length === 1) {
      return parseFloat(value);
    }
  }),

  didInsertElement() {
    this.$().keypress(function (key) {
      if ((key.charCode != 46) && (key.charCode != 45) && (key.charCode < 48 || key.charCode > 57)) return false;
    })
  }
});
