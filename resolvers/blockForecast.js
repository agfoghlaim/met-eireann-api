const axios = require('axios');
const parseString = require('xml2js').parseString;
const Block = require('../models/forecasts/Block');

module.exports.getBlockForecast = async function ({ lat = '53.2719444', long = '-9.0488889' }) {
  if (!lat || !long) {
    const { latitude, longitude } = DEFAULT_COORDINATES;
    lat = latitude;
    long = longitude;
  }

  const url = `http://metwdb-openaccess.ichec.ie/metno-wdb2ts/locationforecast?lat=${lat};long=${long}`;

  try {
    let xmlResponse = await axios.get(url);
    const parsedResponse = XMLToJson(xmlResponse.data);
    const theForecast = new Block(parsedResponse);

    return theForecast.forecasts;
  } catch (error) {
    throw new Error(
      `${error}. There was a problem communicating with Met Eireann\'s API.`
    );
  }
}

function XMLToJson(xml) {
  let ans;
  parseString(xml, (err, result) => {
    if (err) throw new Error('Error parsing XML');
    ans = result;
  });
  return ans;
}