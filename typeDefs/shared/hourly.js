const { GraphQLObjectType, GraphQLString } = require('graphql');

const HourlyDataType = new GraphQLObjectType({
  name: 'HourlyData',
  fields: () => ({
    name: { type: GraphQLString },
    temperature: { type: GraphQLString },
    symbol: { type: GraphQLString },
    weatherDescription: { type: GraphQLString },
    text: { type: GraphQLString },
    windSpeed: { type: GraphQLString },
    windGust: { type: GraphQLString },
    cardinalWindDirection: { type: GraphQLString },
    cardinalWindDirectionhumidity: { type: GraphQLString },
    rainfall: { type: GraphQLString },
    pressure: { type: GraphQLString },
    dayName: { type: GraphQLString },
    date: { type: GraphQLString },
    reportTime: { type: GraphQLString }
  })
});

module.exports = HourlyDataType;