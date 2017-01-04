import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this.set('bookings', this.get('datastub').getBookings());
  },

  actions: {
    decline(booking) {
      //var promise = this.get('request-sender').post('http://localhost:4200/lintang-op/json/person.json');
      var promise = this.get('request-sender').post('http://localhost:8080/');
      promise.then(function (person) {
        console.log(person);
        console.log('name : ' + person.name);
      }, function (reason) {
        console.log(reason);
      });
    }
  }
});
