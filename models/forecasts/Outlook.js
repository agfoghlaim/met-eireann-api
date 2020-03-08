class OutlookModel {
  constructor(data) {

    this.forecast = this.tidyOutlook(data);

  }
  
  tidyOutlook(data) {
  
    const newData = {};
    newData.region = data.forecast.$.region;
    newData.issued = data.forecast.issued[0].$.issued;
    newData.outlook = data.forecast.outlook[0];
    return newData;
  }
}

module.exports = OutlookModel;