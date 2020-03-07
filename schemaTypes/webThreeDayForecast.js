const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

const DayType_WebThreeDay = new GraphQLObjectType({
  name: 'DayType_WebThreeDay',
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

const StationType_WebThreeDay = new GraphQLObjectType({
  name: 'StationType_WebThreeDay',
  fields: () => ({
    id: { type: GraphQLString },
    location: { type: GraphQLString },
    days: { type: new GraphQLList(DayType_WebThreeDay) }
  })
});

const WebThreeDayForecastType = new GraphQLObjectType({
  name: 'WebThreeDayForecastType',
  fields: () => ({
    time: { type: GraphQLString },
    issued: { type: GraphQLString },
    stations: { type: new GraphQLList(StationType_WebThreeDay) }
  })
});

module.exports = WebThreeDayForecastType;
