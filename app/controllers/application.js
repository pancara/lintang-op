import Ember from 'ember';

export default Ember.Controller.extend({
  greeting: 'hello, world',
  init() {
    console.log(sha256('abcdefg'));
  }
});
