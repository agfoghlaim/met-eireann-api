// Confused about Block A/Block B or about what forecasts.precipitationForecast.symbol.number corresponds to?... see https://data.gov.ie/dataset/met-eireann-weather-forecast-api

class ForecastBlockModel {
  constructor(config) {
    // TODO deal with meta
    const weatherForeCasts = config.weatherdata.product[0].time;
   
    const niceMeta = this.doMeta(config.weatherdata.meta[0])
 
    const forecastsInDreamFormat = [
      this.filterDuplicateTimes,
      this.formBasicStructure,
      this.flattenMainForecast,
      this.insertPrecipitationForecast,
      this.flattenPrecipitationForecast
    ].reduce((weatherForeCasts, fn) => {
      return fn(weatherForeCasts);
    }, weatherForeCasts);
    // forecastsInDreamFormat.models = niceMeta;
    this.forecasts = {}

    this.forecasts.forecasts = forecastsInDreamFormat;
    this.forecasts.models = niceMeta

  }

  doMeta(meta) {
    // console.log(meta[0].model)
    return meta.model.map(m=>{
  
     const short = m.$;
      return {
        name: short.name,
        termin: short.termin,
        runEnded: short.runended,
        nextRun: short.nextrun,
        from: short.from,
        to: short.to
      }
    })
  }
  static keyExists(prop, location) {
    if (location.hasOwnProperty(prop)) {
      return true;
    } else {
      return false;
    }
  }

  
  static possibleBlockAKeys() {
    return [
      'temperature',
      'windDirection',
      'windSpeed',
      'humidity',
      'pressure',
      'cloudiness',
      'lowClouds',
      'mediumClouds',
      'highClouds',
      'dewpointTemperature',
      'globalRadiation'
    ];
  }

  formBasicStructure(meData) {
    const meDataCopy = meData;
    meData = meData.map(forecast => {
      return {
        
        from: forecast.$.from,
        to: forecast.$.to,
        location: forecast.location[0].$,
        mainForecast: forecast.location[0]
      };
    });
    meData.tempPrecipitationForecasts = meDataCopy.tempPrecipitationForecasts;
    return meData;
  }

  flattenMainForecast(meData) {
    meData.map(forecast => {
      const mainForecast = forecast.mainForecast;
      const forecastDetails = {};
      const possibleBlockAKeys = ForecastBlockModel.possibleBlockAKeys();
      possibleBlockAKeys.forEach(key => {
        if (ForecastBlockModel.keyExists(key, mainForecast)) {
          forecastDetails[key] = mainForecast[`${key}`][0].$;
        }
      });
      forecast.mainForecast = forecastDetails;
    });

    return meData;
  }

  filterDuplicateTimes(meData) {
    // for every forecast there's the main one (Block A in xml) and one for precipitation and symbol/icon (Block B in xml). This function filters for the main forecast and also keeps a copy of the leftover precipitationForecasts to deal with later.
    const tempPrecipitationForecasts = [];
    meData = meData.filter(forecast => {
      if (
        // ie. if it is a 'Block B' precipitation/symbol forecast
        forecast.location[0].precipitation &&
        !forecast.location[0].temperature
      ) {
        tempPrecipitationForecasts.push(forecast);
      }
      return (
        forecast.location[0].temperature && !forecast.location[0].precipitation
      );
    });
    meData.tempPrecipitationForecasts = tempPrecipitationForecasts;

    return meData;
  }

  flattenPrecipitationForecast(meData) {
    meData.map(forecast => {
      if (!forecast.precipitationForecast) return;
      const flatForecast = {};
      const short = forecast.precipitationForecast.location[0];

      flatForecast.precipitation = short.precipitation[0].$;
      flatForecast.symbol = short.symbol[0].$;

      forecast.precipitationForecast = flatForecast;
    });

    return meData;
  }

  insertPrecipitationForecast(meData) {
    // sort the temporary Block B precipitation forecasts into their corresponding object (by time)
    meData.forEach(forecast => {
      let ans = meData.tempPrecipitationForecasts.find((temp, i) => {
        return temp.$.from === forecast.from;
      });
      forecast.precipitationForecast = ans;
    });

    // TODO - check meData.tempPrecipitationForecasts.length === 0... put them somewhere sensible if not?
    delete meData['tempPrecipitationForecasts'];

    return meData;
  }
}

module.exports = ForecastBlockModel;
