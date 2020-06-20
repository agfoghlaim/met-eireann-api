const axios = require('axios');
const TodaysWeather = require('../models/todaysWeather');

module.exports.getTodaysWeather = async function (args, day) {
  const { station, times } = args;

  const url = ` https://prodapi.metweb.ie/observations/${station}/${day}`;

  try {
    const response = await axios.get(url);
    const temp = new TodaysWeather(response.data, times); // badly named!
    return temp.data;
  } catch (e) {
    throw new Error(
      `${e}. Use 'stationNamesLowercase' query for a list of stations with todays data available.`
    );
  }
}