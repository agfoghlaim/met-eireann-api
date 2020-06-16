const forecastTypes = {
  ForecastType: require('./forecasts/block'),
  // BlockForecastType: require('./forecasts/block'),
  SeaCrossingForecastType: require('./forecasts/seaCrossing'),
  CountyForecastType: require('./forecasts/county'),
  RegionalForecastType: require('./forecasts/regional'),
  NationalForecastType: require('./forecasts/national'),
  InlandLakeForecastType: require('./forecasts/inlandLake'),
  FarmingForecastType: require('./forecasts/farming'),
  CoastalForecastType: require('./forecasts/coastal'),
  PresentObservationsForecastType: require('./forecasts/presentObservations'),
  OutlookForecastType: require('./forecasts/outlook'),
  WebThreeDayForecastType: require('./forecasts/webThreeDay'),
  WarningForecastType: require('./forecasts/warning'),
  WebForecastType: require('./forecasts/web'),
}

module.exports = forecastTypes;

