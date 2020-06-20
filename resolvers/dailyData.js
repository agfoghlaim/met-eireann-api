const axios = require('axios');
const CSVToJSON = require('csvtojson');

module.exports.getDailyData = async function ({ station, dates }) {
 
  if(!station) {
    throw new Error('Missing station param.');
  }
  const stationNumber = station;
  const dailyDataUrl = `https://cli.fusio.net/cli/climate_data/webdata/dly${stationNumber}.csv`;
  // const dailyOrMonthlyData = `https://cli.fusio.net/cli/climate_data/webdata/${timeframe}${stationNumber}.csv`;
  const response = await axios({
    method: 'GET',
    url: dailyDataUrl,
  });

  // remove everything before the first column name in the csv file.
  const startAndMain = response.data.toString().split('Indicator (i)');
  const mainCSV = startAndMain.pop().trim();

  const ans = CSVToJSON({ ignoreEmpty: true })
    .fromString(mainCSV)
    .then((json) => {
      // There has to be a more efficient way of doing this
      if (dates && dates.length) {
        return json.filter((j) => dates.includes(j.date));
      }
      return json;
    });

  return ans;
}