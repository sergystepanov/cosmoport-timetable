
export default class Locale {
  static getLocaleProp(property, locale, uppercase) {
    if (property === undefined || locale === undefined) {
      return '';
    }

    return Object.prototype.hasOwnProperty.call(locale, property)
      ? uppercase
        ? locale[property]
          .values[0]
          .toUpperCase()
        : locale[property].values[0]
      : '';
  }
}
