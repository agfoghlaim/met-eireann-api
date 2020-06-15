class FarmingForecastModel {
  constructor(data) {
    if (!data) return {};
    this.forecast = this.flattenFarming(data);
  }

  flattenFarming(forecast) {
    const keys = FarmingForecastModel.possibleKeys();
    const short = forecast['farm-analysis'];
    const newData = {};
    newData.issued = short.issued[0].$['issued-time'];
    keys.map(key => {
      newData[`${key}`] = {
        title: short[`${key}`][0].$.title,
        text: short[`${key}`][0].text[0]
      };
    });
    return newData;
  }

  static possibleKeys() {
    return [
      'rain',
      'temperature',
      'sunshine',
      'drying_conditions',
      'spraying',
      'field_conditions'
    ];
  }
}

module.exports = FarmingForecastModel;
