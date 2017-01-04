import Ember from 'ember';
import RegisterAsComponent from '../mixins/register-as-component';

export default Ember.Component.extend(RegisterAsComponent, {
  tagName: 'div',
  classNames: ['pw-aircraft-add-task', 'pw-panel'],
  startDate: new Date(),
  endDate: new Date(),
  isSpecialPrice: false,
  pricePercentage: 10,
  actions: {

    save() {
      var param = {
        startDate: this.get('startDate'),
        endDate: this.get('endDate'),
        isSpecialPrice: this.get('isSpecialPrice'),
        pricePercentage: this.get('pricePercentage')
      };

      this.sendAction('save', param);
    },

    cancel() {
      this.sendAction('cancel');
    }
  }
});
