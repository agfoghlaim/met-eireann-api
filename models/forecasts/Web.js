class WebForecastModel {
  constructor(data) {
    this.forecast = this.tidyWebForecast(data);
  }

  tidyWebForecast(data) {
    const newData = {};
    const short = data.forecast;

    newData.time = data.forecast.$.time;
    newData.issued = data.forecast.$.issued;
    newData.stations = short.station.map((s) => {
      return {
        id: s.id[0],
        location: s.location[0],
        days: s.day.map((dayAtStation) => {
          for (let [key, value] of Object.entries(dayAtStation)) {
            dayAtStation[key] = value[0].trim();
          }
          return dayAtStation;
        }),
      };
    });

    return newData;
  }
}

module.exports = WebForecastModel;
