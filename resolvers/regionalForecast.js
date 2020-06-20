const { getLiveTextForecast } = require('./liveTextForecast');

module.exports.getRegionalForecast = async function (args) {
  if (!args.region) throw new Error('Please set region');

  const regionalForecast = await getLiveTextForecast(`x${args.region}`);
  return regionalForecast;
};
