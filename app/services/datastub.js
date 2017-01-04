import Ember from 'ember';

import Booking from '../objects/booking';
import Aircraft from '../objects/aircraft';


export default Ember.Service.extend({
  aircrafts: [],
  notifications: [],
  bookings: [],
  historyBookings: [],
  getMainMenu() {
    //let mnuDashboard = this.createMenuObject('main', 'dashboard', 'DASHBOARD', false, null);
    let mnuProfile = this.createMenuObject('main.operator-profile', 'building', 'PROFILE', false, null);
    let mnuBooking = this.createMenuObject('main.booking.active', 'ticket', 'BOOKING', false, null);
    let mnuAircraft = this.createMenuObject('main.aircraft', 'plane', 'AIRCRAFT', false, null);
    let mnuSales = this.createMenuObject('main.sales', 'area-chart', 'SALES', false, null);
    let mnuDisclaimer = this.createMenuObject('main.disclaimer', 'exclamation-circle', 'DISCLAIMER', false, null);

    //let menus = [mnuDashboard, mnuProfile, mnuBooking, mnuAircraft, mnuSales];
    let menus = [mnuProfile, mnuBooking, mnuAircraft, mnuSales, mnuDisclaimer];
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
    for (var i = 0; i < 15; i++) {
      var booking = Booking.create({
        id: i,
        bookingNumber: '#999-000-00' + (i + 1),
        customerName: 'Badu Eta',
        date: new Date()
      });
      this.notifications.push(booking);
    }
    return this.notifications;
  },

  getBookings() {
    var bookingCode = 1230;
    for (var i = 0; i < 4; i++) {
      this.bookings.push(Booking.create({
        id: 1,
        date: new Date(),
        bookingCode: '1234-' + (bookingCode + i),
        aircraft: 'CXF-1999',
        destination: 'WIII-WIHH',
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
        total: 72992,
        status: (i % 2) + 1
      }));
    }

    return this.bookings;
  },
  getHistoryBookings() {
    var bookingCode = 1230;
    for (var i = 0; i < 8; i++) {
      this.historyBookings.push(Booking.create({
        id: 1,
        date: new Date(),
        bookingCode: '1234-' + (bookingCode + i),
        aircraft: 'CXF-1999',
        destination: 'WIII-WIHH',
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
        total: 72992,
        status: (i % 2) + 3
      }));
    }

    return this.historyBookings;
  },
  getAircrafts() {
    var aircrafts = [];
    for (var i = 0; i < 4; i++) {
      aircrafts.push(Aircraft.create({
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
    return aircrafts;
  },

  findAircraftById(id) {
    if (this.aircrafts.length === 0) {
      this.getAircrafts();
    }

    for (var i = 0; i < this.aircrafts.length; i++) {
      if (this.aircrafts[i].id == id)
        return this.aircrafts[i];
    }
  },

  getChartDataSalesByDate() {
    var today = new Date();
    var currentMonth = today.getMonth();
    var date = new Date(today.getFullYear(), today.getMonth(), 1);
    var labels = [];
    var data = [];

    // create labels
    while (true) {
      if (date.getMonth() !== currentMonth) {
        break;
      }
      labels.push(moment(date).format('D'));
      date.setDate(date.getDate() + 1);

      data.push(Math.floor(Math.random() * 45));
    }

    var colors = randomColor({
      count: data.length,
      hue: 'blue'
    });

    return {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# Charter',
          data: data,
          backgroundColor: colors,
          borderWidth: 0
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        title: {
          display: true,
          fontSize: 15,
          text: 'SALES BY DATE \n ' + moment(today).format('MMMM')
        }
      }
    };
  },

  getChartDataSalesByAircraftType() {
    var labels = ['CESSNA', 'CIRRUS SF50', 'HondaJET', 'Hawker', 'Pilatus PC'];
    var data = [2, 1, 3, 1, 2];

    var colors = randomColor({
      count: data.length,
      hue: 'orange'
    });

    return {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# Charter',
          data: data,
          backgroundColor: colors,
          borderWidth: 0
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        title: {
          display: true,
          fontSize: 15,
          text: 'SALES BY AIRCRAFT'
        }
      }
    };
  },

  getAircraftTypes() {
    var aircraftTypeNames = [
      'Aircraft Type',
      'Ultra Long Range',
      'Heavy Jet',
      'Super Mid Size',
      'Entry Level',
      'Turbo Prop',
      'Prop',
      'Heli',
      'Test'];

    var aircraftTypes = [];

    aircraftTypeNames.forEach(function (item, index) {
      aircraftTypes.push({
        id: index + 1,
        text: item,
        checked: false
      });
    });

    return aircraftTypes;
  },

  getGenderList() {
    return ['MALE', 'FEMALE'];
  }
});
