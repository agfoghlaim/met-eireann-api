// Models

const forecastModels = {
  BlockForecast: require('./forecasts/Block'),
  SeaCrossingForecast: require('./forecasts/SeaCrossing'),
  CountyForecast: require('./forecasts/County'),
  RegionalForecast: require('./forecasts/Regional'),
  NationalForecast: require('./forecasts/National'),
  InlandLakeForecast: require('./forecasts/InlandLake'),
  FarmingForecast: require('./forecasts/Farming'),
  CoastalForecast: require('./forecasts/Coastal'),
  PresentObservationsForecast: require('./forecasts/PresentObservations'),
  OutlookForecast: require('./forecasts/Outlook'),
  WebThreeDayForecast: require('./forecasts/WebThreeDay'),
  WarningForecast: require('./forecasts/Warning'),
  WebForecast: require('./forecasts/Web.js')
};

module.exports = forecastModels;



