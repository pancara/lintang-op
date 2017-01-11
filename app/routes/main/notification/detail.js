import Ember from 'ember';

import Notification from '../../../objects/notification';

export default Ember.Route.extend({

  model(params) {
    console.log(params);
    return Notification.create({
      id: params.id,
      content: 'content message ' + params.id,
      date: params.date
    });
  }
});
