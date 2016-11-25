import Ember from 'ember';
import Constant from '../utils/constants';

export default Ember.Service.extend({

  isSmallScreen() {
    var query = '(max-width:' + Constant.SCREEN.PHONE.WIDTH + 'px)';
    return window.matchMedia(query).matches;
  },

  applyNiceScroll(target) {
    let $el = Ember.$(target);

    if ($el.getNiceScroll().length !== 0) {
      return;
    }

    $el.niceScroll({
      cursorcolor: "#AAA",
      cursoropacitymin: 0,
      cursoropacitymax: 1,
      cursorwidth: "8px",
      cursorborder: "0px solid #fff",
      cursorborderradius: "2px",
      zindex: 99999
    });
  }
});
