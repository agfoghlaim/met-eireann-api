const axios = require('axios');
const CSVToJSON = require('csvtojson');
const { dailyDataLegend, mainStations } = require('../constants');

module.exports.getDailyData = async function ({ station, dates, year }) {
  // Error if there's no station arg.
  if (!station) {
    throw new Error('Missing station param.');
  }

  const stationNum = station; // rename for clarity.

  const stationDets = mainStations.find(
    (station) => station.stationNumber === stationNum
  );

  const dailyDataUrl = `https://cli.fusio.net/cli/climate_data/webdata/dly${stationNum}.csv`;
  // const dailyOrMonthlyData = `https://cli.fusio.net/cli/climate_data/webdata/${timeframe}${stationNum}.csv`;
  const response = await axios({
    method: 'GET',
    url: dailyDataUrl,
  });

  /**
   * Everything before "Indication (i)" is not csv?. It contains basic info on the relevant weather station & a legend to explain what the keys in the csv data mean (eg smd_wd:-  Soil Moisture Deficits(mm) well drained).
   *
   * A version of the legend is hardcoded it in consts.js and will add it in here as ans.legend
   */

  // remove everything before the first column name in the csv file.
  const startAndMain = response.data.toString().split('Indicator (i)');

  const mainCSV = startAndMain.pop().trim();

  const ans = CSVToJSON({ ignoreEmpty: true })
    .fromString(mainCSV)
    .then((json) => {
      const dailyData = {
        station: stationDets,
        legend: dailyDataLegend,
        data: json,
      };

      // Filter specific dates if dates arg exists.
      if (dates && dates.length) {
        dailyData.data = json.filter((j) => dates.includes(j.date));
      }

      // If no dates, filter by year if year arg exists.
      if (year && year.length === 4) {
        // dates are in format '20-jan-2021'.
        const str = `-${year}`;

        // check if json.date includes eg. '-2021'.
        dailyData.data = json.filter((j) => j.date.includes(str));
      }

      return dailyData;
    });

  return ans;
};
