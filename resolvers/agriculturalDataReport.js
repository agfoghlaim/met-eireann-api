const axios = require('axios');
const AgriculturalDataReport = require('../models/agriculturalDataReport');

module.exports.getAgriculturalDataReport = async function () {

  const url = `https://prodapi.metweb.ie/agriculture/report`;
  try {
    const response = await axios.get(url);
    const temp = new AgriculturalDataReport(response.data);
    return temp.data;
  } catch (e) {
    throw new Error(e);
  }
}