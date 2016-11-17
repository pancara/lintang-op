import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: 'pw-tab-button',
  classNameBindings: ['button.active:active'],

  mouseDown() {
    let button = this.get('button');
    this.sendAction('buttonClick', button);
  }

});
