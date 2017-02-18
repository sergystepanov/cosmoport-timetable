
export default class Locale {
  static getLocaleProp(locale, property) {
    return Object
      .prototype
      .hasOwnProperty
      .call(locale, property)
      ? locale[property].values[0]
      : '';
  }
}
