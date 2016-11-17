import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  iconName: '',
  classNames: ['iconmenu', 'pageheader-iconmenu'],
  classNameBindings: ['menuVisible'],
  badgeType: 'badge-warning',
  itemCount: 0,
  items: [],
  menuVisible: false,
  attributeBindings: ['tabIndex'],
  tabIndex: 0,

  onHiding: false,

  didInsertElement() {
  },

  hideMenu() {
    this.set('menuVisible', false);
  },

  focusOut() {
    this.hideMenu();
  },

  click() {
    this.toggleProperty('menuVisible');
  },

  actions: {
    showMenu() {
      this.set('menuVisible', true);
    },

    itemClick(param) {
      this.sendAction('itemSelect', this.get('name'), param.get('item'));
      this.hideMenu();
    }
  }
});
