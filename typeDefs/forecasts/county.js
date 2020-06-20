const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt
} = require('graphql');


const  CountyForecastType = new GraphQLObjectType({
  name: 'CountyForecast',
  fields: () => ({
    time: {type: GraphQLString},
    issued: {type: GraphQLString},
    counties: {type: new GraphQLList(CountyType)}
  })
})

const CountyType = new GraphQLObjectType({
  name: 'County',
  fields: () => ({
    name: {type: GraphQLString},
    days: {type: new GraphQLList(DayType)}
  })
})

const WindspeedType = new GraphQLObjectType({
  name: 'Windspeed',
  fields: () => ({
    value: {type: GraphQLInt},
    units: {type: GraphQLString}
  })
})


const DayType = new GraphQLObjectType({
  name: 'Day',
  fields: () => ({
    day_num: {type: GraphQLInt},
    date: {type: GraphQLString},
    min_temp: {type: GraphQLInt},
    max_temp: {type: GraphQLInt},
    weather: {type: GraphQLString},
    wind_speed: {type: WindspeedType},
    wind_dir: {type: GraphQLString},
    wind_deg: {type: GraphQLFloat},
    rainfall_6_18: {type: GraphQLFloat},
    rainfall_18_6: {type: GraphQLFloat}
  })
})



module.exports = CountyForecastType;

