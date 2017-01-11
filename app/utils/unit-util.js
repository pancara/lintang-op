export default {

  roundFix(number, precision) {
    var multi = Math.pow(10, precision);
    return Math.round((number * multi).toFixed(precision + 1)) / multi;
  },

  knotToKm(knot, precision) {
    let value = 1.852 * knot;
    if (precision != null) {
      return this.roundFix(value, precision);
    }
  },

  kmToKnot(km, precision) {
    let value = 0.540 * km;
    if (precision != null) {
      return this.roundFix(value, precision);
    }
  }
};
