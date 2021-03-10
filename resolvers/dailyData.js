const axios = require('axios');
const CSVToJSON = require('csvtojson');

module.exports.getDailyData = async function ({ station,  dates, year }) {

  // Error if there's no station arg.
  if(!station) {
    throw new Error('Missing station param.');
  }

  const stationNum = station; // rename for clarity.

  const dailyDataUrl = `https://cli.fusio.net/cli/climate_data/webdata/dly${stationNum}.csv`;
  // const dailyOrMonthlyData = `https://cli.fusio.net/cli/climate_data/webdata/${timeframe}${stationNum}.csv`;
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

      // Filter specific dates if dates arg exists.
      if (dates && dates.length) {
        return json.filter((j) => dates.includes(j.date));
      }

      // If no dates, filter by year if year arg exists.
      if(year && year.length === 4) {
        
        // dates are in format '20-jan-2021'.
        // check if json.date includes eg. '-2021'.
        const str = `-${year}`;
        return json.filter((j)=> j.date.includes(str) );
      }

      // Return everything if no args.
      return json;
    })

  return ans;
}