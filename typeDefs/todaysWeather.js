const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const HourlyDataType = require('./shared/hourly');

const TodaysWeatherType = new GraphQLObjectType({
  name: 'TodaysWeather',
  fields: () => ({
    hourly: { type: new GraphQLList(HourlyDataType) }
  })
});

module.exports = TodaysWeatherType;
