class InlandLakeForecastModel {
  constructor(parsedResponse) {
    this.forecast = this.tidyInlandLake(parsedResponse);
  }

  tidyInlandLake(data) {
    const newData = {};
    const short = data['inland-lake-forecast'];
    newData.title = short.title[0];
    newData.issued = short.issued[0].$['issued-time'];
    newData.overView = {
      time: short['lake-met-sit'][0].$.time,
      head: short['lake-met-sit'][0].head[0],
      text: short['lake-met-sit'][0].text[0]
    };
    newData.lakes = short.lake.map(l => {
      for (let [key, value] of Object.entries(l)) {
        l[key] = value[0];
      }
      return l;
    });
    return newData;
  }
}

module.exports = InlandLakeForecastModel;
