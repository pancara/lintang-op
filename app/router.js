import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('login');
  this.route('forget-password');

  this.route('main', function () {

    this.route('change-password');
    this.route('user-profile', function () {
      this.route('update');
    });

    this.route('booking', function () {
      this.route('active');
      this.route('history');
    });

    this.route('sales');

    this.route('aircraft', {path: 'aircraft'});
    this.route('aircraft-detail', {path: 'aircraft-detail/:id'}, function () {
      this.route('view', {path: 'view'});
      this.route('price-availability', {path: 'price-availability'});
    });

    this.route('notification', {path: 'notification'}, function () {
      this.route('notification-detail', {path: ':id'});
    });

    this.route('operator-profile', function () {
      this.route('update');
    });
  });

  this.route('help');

  this.route('logout');
  this.route('demo');
  this.route('report');
});

export default Router;
