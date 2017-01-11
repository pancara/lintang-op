import moment from 'moment';

export default {

  cleanEmptyProperty(obj) {
    if (obj == null)
      return null;

    Object.keys(obj).forEach(function (key, index) {
      let value = obj[key];
      if (value === '' || value == null) {
        delete obj[key];
      }
    });

    return obj;
  },

  toJson(obj) {
    let cleanedObj = this.cleanEmptyProperty(obj);
    return JSON.stringify(cleanedObj);

  }
};
