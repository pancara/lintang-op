import Ember from 'ember';
import RegisterAsComponent from '../mixins/register-as-component';

export default Ember.Component.extend(RegisterAsComponent, {
  tagName: 'select',
  classNames: ['form-control'],
  //attribute
  attributeBindings: ['size', 'name', 'style', 'multiple'],
  size: 5,
  name: 'select',
  multiple: false,
  options: [],
  ref: null,

  didInsertElement() {
    this._super(...arguments);
    this.sendAction('componentCreated', this);
    this.get('ui-service').applyNiceScroll(this.$());
  },

  getSelectedIndex() {
    return this.$("option:selected").index();
  },

  actions: {
    itemSelect(option) {
      this.sendAction('itemSelect', option);
    },

    itemAction(option) {
      this.sendAction('itemAction', option);
    }
  }
});
