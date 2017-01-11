import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['pw-tab-buttons'],
  router: Ember.inject.service("-routing"),

  didInsertElement() {
    let buttonCount = this.get('buttons').length;
    let width = Math.floor(100 / buttonCount);

    //this.$('div.pw-tab-button').each(function (index, el) {
    //  var w = index < buttonCount - 1 ? width : 100 + width - (width * buttonCount);
    //  Ember.$(el).css({
    //    width: w + '%'
    //  });
    //});
    let r = this.get("router");
    r.addObserver("currentRouteName", this, this.currentRouteNameChanged);
    this.currentRouteNameChanged(r);
  },

  currentRouteNameChanged(router, propertyName) {
    let currentRoute = router.get('currentRouteName');

    let buttons = this.get('buttons');
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].route === currentRoute) {
        this.activateButton(buttons[i]);
        break;
      }
    }
  },


  activateButton(button) {
    button.set('active', true);
    let buttons = this.get('buttons');
    buttons.forEach(function (bt) {
      if (bt !== button) {
        bt.set('active', false);
      }
    });
  },
  actions: {
    buttonClick(button) {
      this.sendAction('buttonClick', button);
    }
  }
});
