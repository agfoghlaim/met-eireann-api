const { GraphQLObjectType, GraphQLList } = require('graphql');
const HourlyDataType = require('./shared/hourly');

const YesterdaysWeatherType = new GraphQLObjectType({
  name: 'YesterdaysWeather',
  fields: () => ({
    hourly: { type: new GraphQLList(HourlyDataType) }
  })
});

module.exports = YesterdaysWeatherType;
