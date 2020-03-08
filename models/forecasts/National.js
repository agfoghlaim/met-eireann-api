class NationalForecastModel {
  constructor(data) {
  
    const dataCopy = data;
    this.forecast = this.tidyForecast(dataCopy)
 
  }
  tidyForecast(data) {
    let newData = {};
    newData.region = data.forecast.$.region
    newData.issued = data.forecast.issued[0].$.issued;
    newData.today = data.forecast.today[0];
    newData.tonight = data.forecast.tonight[0];
    newData.tomorrow = data.forecast.tomorrow[0];
    newData.outlook = data.forecast.outlook[0]

    return newData;
    
  }

}

module.exports = NationalForecastModel;