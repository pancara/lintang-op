import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('login');

  this.route('forget-password');
  this.route('forget-password-reset');

  this.route('main', function () {
    this.route('change-password');
    this.route('operator-user-profile');

    this.route('booking', function () {
      this.route('active');
      this.route('history');
    });

    this.route('sales');

    this.route('aircraft', {path: 'aircraft'}, function () {
      this.route('form', {path: 'form'});

      this.route('detail', {path: ':id'}, function () {
        this.route('images', {path: 'images'});
        this.route('availability', {path: 'availability'});
        this.route('amenities', {path: 'amenities'});
        this.route('special-price', {path: 'special-price'});
      });
    });


    this.route('notification', {path: 'notification'}, function () {
      this.route('detail', {path: ':id'});
    });

    this.route('operator-profile');

    this.route('user', {path: 'user'}, function () {
      this.route('add', {path: 'add'});
      this.route('update-profile', {path: 'update-profile'});
      this.route('update-role', {path: 'update-role'});

    });

    this.route('disclaimer');
  });

  this.route('help');

  this.route('logout');
  this.route('demo');
  this.route('report');

});

export default Router;
