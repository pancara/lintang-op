import Ember from 'ember';

import Booking from '../objects/booking';
import Aircraft from '../objects/aircraft';

export default Ember.Service.extend({
  aircrafts: [],
  notifications: [],
  bookings: [],
  getMainMenu() {
    let mnuProfile = this.createMenuObject('main.profile', 'user', 'PROFILE', false, null);
    let mnuBooking = this.createMenuObject('main.booking.active', 'ticket', 'BOOKING', false, null);
    let mnuAircraft = this.createMenuObject('main.aircraft', 'plane', 'AIRCRAFT', false, null);
    let mnuSales = this.createMenuObject('main.sales', 'area-chart', 'SALES', false, null);

    let menus = [mnuProfile, mnuBooking, mnuAircraft, mnuSales];
    return menus;
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

  getNotifications() {
    for (var i = 0; i < 5; i++) {
      this.notifications.push({
        id: i,
        text: 'notification #' + i,
        date: new Date()
      });
    }
    return this.notifications;
  },

  getBookings() {
    var bookingCode = 1230;
    for (var i = 0; i < 8; i++) {
      this.bookings.push(Booking.create({
        id: 1,
        date: new Date(),
        bookingCode: '1234-' + (bookingCode + i),
        aircraft: 'CXF-1999',
        destination: 'CKG-HLM',
        passengers: [
          {
            name: 'Mr. Claudius Smith',
            gender: 'Male',
            passportNumber: 'N 123 123 123'
          },
          {
            name: 'Mrs. Samantha Smith',
            gender: 'Female',
            passportNumber: 'L 123 123 333'
          },
          {
            name: 'Mr. Daniel C. Anderson',
            gender: 'Male',
            passportNumber: 'M 123 123 444'
          }],
        charterPrices: 60000,
        nonMemberFreeForCharter: 7900,
        subtotal: 67900,
        taxes: 5092,
        total: 72992
      }));
    }

    return this.bookings;
  },

  getAircrafts() {
    for (var i = 0; i < 4; i++) {
      this.aircrafts.push(Aircraft.create({
        id: i,
        name: 'CR-0001' + i,
        type: 'Super Midsize Jet',
        pricing: (i + 10000) + 10000,
        speed: 800,
        range: 4630,
        maintenanceCost: 0,
        maxPayload: 1200,
        open: true,
        active: true,
        seatingMax: 9,
        pictureUrl: 'private-jet' + (i % 2 + 1) + '.jpg'
      }));
    }
    return this.aircrafts;
  },

  findAircraftById(id) {
    if (this.aircrafts.length === 0) {
      this.getAircrafts();
    }

    for (var i = 0; i < this.aircrafts.length; i++) {
      if (this.aircrafts[i].id == id)
        return this.aircrafts[i];
    }
  }
});
