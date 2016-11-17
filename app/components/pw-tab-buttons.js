import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['pw-tab-buttons'],

  didRender() {
    let buttonCount = this.get('buttons').length;
    let percentWidth = Math.floor(100 / buttonCount);
    let buttonEls = this.$('li');

    for (var i = 0; i < buttonEls.length - 1; i++) {
      Ember.$(buttonEls[i]).css({
        width: percentWidth + '%'
      });
    }

    let width = 100 - (percentWidth * (buttonEls.length - 1));
    Ember.$(buttonEls[buttonEls.length - 1]).css({
      width: width + '%'
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
