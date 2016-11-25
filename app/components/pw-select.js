import Ember from 'ember';

export default Ember.Component.extend({
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
