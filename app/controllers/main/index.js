import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    let datastub = this.get('datastub');

    this.set('chartData1', datastub.getChartDataSalesByDate());
    this.set('chartData2', datastub.getChartDataSalesByAircraftType());
  }
});
