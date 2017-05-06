/**
 * The class for date manipulations.
 *
 * @since 0.1.0
 */
export default class _Date {
  /**
  * Converts the number of minutes into hh:mm format.
  *
  * @param {number} minutes The total number of minutes.
  * @returns {string} The formated string (hh:mm).
  */
  static minutesToHm(minutes) {
    if (minutes < 1) {
      return '00:00';
    }

    const h = _Date.fullHours(minutes);
    const m = _Date.minutesApartHours(minutes);

    return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}`;
  }

  static fullHours(minutes) {
    if (minutes < 1) {
      return 0;
    }

    return Math.trunc(minutes / 60);
  }

  static minutesApartHours(minutes) {
    if (minutes < 1) {
      return 0;
    }

    return minutes % 60;
  }
}