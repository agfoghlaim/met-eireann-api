class WebThreeDayForecastModel {
  constructor(data, args) {
    let forecast = this.tidyWebThreeDayForecast(data);
    console.log(forecast)
    if (args.locations && args.locations.length) {
      forecast.stations = forecast.stations.filter((station) =>
        args.locations.includes(station.location)
      );
    }
    this.forecast = forecast;
  }

  tidyWebThreeDayForecast(data) {
    const newData = {};
    newData.time = data.forecast.$.time;
    newData.issued = data.forecast.$.issued;
    newData.stations = data.forecast.station.map((s) => {
      return {
        id: s.id[0],
        location: s.location[0],
        days: s.day.map((dayAtStation) => {
          for (let [key, value] of Object.entries(dayAtStation)) {
            dayAtStation[key] = value[0];
          }
          return dayAtStation;
        }),
      };
    });

    return newData;
  }
}

module.exports = WebThreeDayForecastModel;
