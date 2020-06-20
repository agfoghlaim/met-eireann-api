const axios = require('axios');
const MonthlyWeather = require('../models/monthlyWeather');

module.exports.getMonthlyWeather = async function (station) {

  if (!station)
    throw new Error(
      `Provide station:stationName as an argument. Run stationNames query for a list of stations with monthlyData available.`
    );

  const url = `https://prodapi.metweb.ie/monthly-data/${station}`;
  try {
    const response = await axios.get(url);
    const temp = new MonthlyWeather(response.data);
    return temp.data;
  } catch (e) {
    throw new Error(
      `${e}. Use 'stationNames' query for a list of stations with monthlyData available.`
    );
  }
}

