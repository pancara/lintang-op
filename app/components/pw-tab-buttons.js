import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['pw-tab-buttons'],

  didRender() {
    let buttonCount = this.get('buttons').length;
    let width = Math.floor(100 / buttonCount);

    this.$('div.pw-tab-button').each(function (index, el) {
      var w = index < buttonCount - 1 ? width : 100 + width - (width * buttonCount);
      Ember.$(el).css({
        width: w + '%'
      });
    });
  },

  actions: {
    buttonClick(button) {
      button.set('active', true);

      let buttons = this.get('buttons');
      buttons.forEach(function (bt) {
        if (bt !== button) {
          bt.set('active', false);
        }
      });

      this.sendAction('buttonClick', button);
    }
  }
});
