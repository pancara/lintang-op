import Ember from 'ember';

export default Ember.Controller.extend({
  dataStub: Ember.inject.service('datastub'),

  init() {
    let dataStub = this.get('dataStub');

    this.set('chartData1', dataStub.getChartDataSalesByDate());
    this.set('chartData2', dataStub.getChartDataSalesByAircraftType());
  }
});
