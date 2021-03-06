import Ember from 'ember';

export default Ember.Mixin.create({
  tagName: 'li',
  name: null,
  mouseDown() {
    this.sendAction('onItemClick', this.get('data'));
  }
});
