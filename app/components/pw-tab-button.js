import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: 'pw-tab-button',
  classNameBindings: ['button.active:active'],

  click() {
    let button = this.get('button');
    this.sendAction('buttonClick', button);
  }

});
