import Ember from 'ember';
import RegisterAsComponent from '../mixins/register-as-component';

export default Ember.Component.extend(RegisterAsComponent, {
  tagName: 'ul',
  classNameBindings: ['name'],
  getSelected() {
    var selected = [];
    this.get('options').forEach(function (option) {
      if (option.checked) {
        selected.push(option);
      }
    });
    return selected;
  }
});
