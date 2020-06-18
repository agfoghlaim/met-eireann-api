const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

// TODO - this is the same type as in webThreeDayForecas
const DayType_WebForecast = new GraphQLObjectType({
  name: 'Day_WebForecast',
  fields: () => ({
    day_num: { type: GraphQLString },
    date: { type: GraphQLString },
    min_temp: { type: GraphQLString },
    max_temp: { type: GraphQLString },
    weather: { type: GraphQLString },
    weather_night: { type: GraphQLString },
    weather_text: { type: GraphQLString },
    weather_textN: { type: GraphQLString },
    wind_speed: { type: GraphQLString },
    wind_dir: { type: GraphQLString },
    wind_speed_night: { type: GraphQLString },
    wind_dir_night: { type: GraphQLString }
  })
});

const StationType_WebForecast = new GraphQLObjectType({
  name: 'Station_WebForecast',
  fields: () => ({
    id: { type: GraphQLString },
    location: { type: GraphQLString },
    days: { type: new GraphQLList(DayType_WebForecast) }
  })
});

const WebForecastType = new GraphQLObjectType({
  name: 'WebForecast',
  fields: () => ({
    // test: {type: GraphQLString}
    time: { type: GraphQLString },
    issued: { type: GraphQLString },
    stations: { type: new GraphQLList(StationType_WebForecast) }
  })
});

module.exports = WebForecastType;
