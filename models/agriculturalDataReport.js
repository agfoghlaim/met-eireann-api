class AgricultureDataReportModel {
  constructor(data) {
    this.data = {
      valid: this.doValid(data.report.valid),
      station: this.doStation(data.report.station),
    };
  }

  doValid(valid) {
    return {
      from: valid['@from'],
      to: valid['@to'],
    };
  }

  doStation(stations) {
    return stations.map((station) => {
      return {
        name: station['@name'],
        temp: {
          text: station.temp['#text'],
          unit: station.temp['@unit'],
        },
        tempDiff: {
          text: station['temp-diff']['#text'],
          unit: station['temp-diff']['@unit'],
        },
        rain: {
          text: station.rain['#text'],
          unit: station.rain['@unit'],
        },
        rainPer: station['rain-per'],
        sun: {
          unit: station.sun['@units'],
        },
        sunPer: station['sun-per'],
        soil: {
          text: station['soil']['#text'],
          unit: station['soil']['@units'],
        },
        soilDiff: {
          unit: station['soil-diff']['@units'],
        },
        wind: {
          text: station['wind']['#text'],
          unit: station['wind']['@units'],
        },
        windDiff: {
          unit: station['wind-diff']['@units'],
        },
        radiation: {
          text: station.radiation['#text'],
          unit: station.radiation['@units'],
        },
        radiationPer: station['radiation-per'],
      };
    });
  }
}

module.exports = AgricultureDataReportModel;
