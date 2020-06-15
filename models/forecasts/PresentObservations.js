class PresentObservations {
  constructor(data, args) {
    let allObservations = this.tidyPresentObservations(data);

    // this is bad, should not put them in in the first place
    if (args && args.length) { 
      const stations = allObservations.stations.filter((observation) =>
        args.includes(observation.name)
      );
      allObservations.stations = stations;
    }

    this.forecast = allObservations;
  }

  tidyPresentObservations(data) {
    const newData = {};
    newData.time = data.observations.$.time;
    newData.stations = data.observations.station.map((s) => {
      return {
        name: s.$.name,
        temp: {
          value: s.temp[0]._,
          unit: s.temp[0].$.unit,
        },
        symbol: s.symbol[0],
        weather_text: s.weather_text[0],
        wind_speed: {
          value: s.wind_speed[0]._,
          unit: s.wind_speed[0].$.unit,
        },
        wind_direction: s.wind_direction[0],
        humidity: {
          value: s.humidity[0]._,
          unit: s.humidity[0].$.unit,
        },
        rainfall: {
          value: s.rainfall[0]._,
          unit: s.rainfall[0].$.unit,
        },
        pressure: {
          value: s.pressure[0]._,
          unit: s.pressure[0].$.unit,
        },
      };
    });

    return newData;
  }
}

module.exports = PresentObservations;
