import Ember from 'ember';

//import Booking from '../objects/booking';
//import Aircraft from '../objects/aircraft';


export default Ember.Service.extend({

  getMainMenu() {


    let mnuOperatorProfile = this.createMenuObject('main.operator-profile', 'building', 'PROFILE', false, null);
    let mnuUser = this.createMenuObject('main.user', 'user', 'USER', false, null);

    let mnuOperator = this.createMenuObject('main.operator', 'building', 'OPERATOR', true, [mnuOperatorProfile, mnuUser]);

    let mnuBooking = this.createMenuObject('main.booking.active', 'bookmark', 'BOOKING', false, null);
    let mnuAircraft = this.createMenuObject('main.aircraft', 'plane', 'AIRCRAFT', false, null);
    let mnuSales = this.createMenuObject('main.sales', 'line-chart', 'SALES', false, null);
    //let mnuDisclaimer = this.createMenuObject('main.disclaimer', 'exclamation-circle', 'DISCLAIMER', false, null);


    return [mnuOperator, mnuAircraft, mnuBooking, mnuSales];
    //return [mnuOperator, mnuAircraft, mnuBooking];
  },

  createMenuObject(routeName, iconName, labelText, hasChild, submenus) {
    return {
      routeName: routeName,
      iconName: iconName,
      labelText: labelText,
      hasChild: hasChild,
      submenus: submenus
    };
  },

  getOperatorStatuses() {
    return ['ACTIVE', 'INACTIVE'];
  },

  getAircraftStatuses() {
    return ['ACTIVE', 'INACTIVE'];
  },

  getAmenitiesStatuses() {
    return ['ACTIVE', 'INACTIVE'];
  },

  getAircraftTypes() {
    return ['ULTRA_LONG_RANGE',
      'HEAVY_JET',
      'SUPER_MID_SIZE_JET',
      'MID_SIZE_JET',
      'ENTRY_LEVEL_JET',
      'TURBO_PROP',
      'PROP',
      'HELI'];
  },

  getGenders() {
    return ['MALE', 'FEMALE'];
  },

  getOperatorRoles() {
    return ['OPERATOR_OWNER', 'OPERATOR_MANAGER', 'OPERATOR_USER'];
  },

  getPricingLevels() {
    return [1, 2, 3, 4, 5];
  },
  getPricingAmountTypes() {
    return ['RUPIAH', 'PERCENTAGE'];
  },

  getPricingCountTypes() {
    return ['BEFORE_DISCOUNT', 'AFTER_DISCOUNT', 'AFTER_DISCOUNT_AND_SERVICE'];
  },

  getPricingConditions() {
    return ['NO_CONDITION', 'MORE_THAN_AMOUNT', 'LESS_THAN_AMOUNT', 'CREDIT_CARD_PAYMENT'];
  },

  getPricingStatuses() {
    return ['ACTIVE', 'INACTIVE'];
  },

  getBookingReasons() {
    return ['BOOKED', 'MAINTENANCE', 'PRIVATE_USE', 'OFFLINE_BOOKED', 'OTHER'];
  },

  getBookingStatuses() {
    return ['CREATED', 'CANCELED', 'PAID', 'CONFIRMED'];
  },

  getOrderTypes() {
    return ['CHARTER', 'DEAL', 'SHUTTLE'];
  }
});
