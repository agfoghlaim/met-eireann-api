const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const RegionalForecastType = new GraphQLObjectType({
  name:'RegionalForecast',
  fields: () =>({
    region: {type: GraphQLString},
    issued: {type: GraphQLString},
    today: {type: GraphQLString},
    tonight: {type: GraphQLString},
    tomorrow: {type: GraphQLString},
    pollen: {type: GraphQLString}, 
    solar_uv: {type: GraphQLString} 
  })
})


module.exports = RegionalForecastType;

