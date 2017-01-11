import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table',
  classNames: ['pw-table'],
  classNameBindings: ['isZebra:pw-zebra', 'isBordered:pw-bordered', 'isHighlighted:pw-highlighted'],
  isZebra: false,
  isBordered: true,
  isHighlighted: false,

  actions: {
    triggerAction(actionName, data, extra) {
      this.sendAction(actionName, data, extra);
    }
  }
});
