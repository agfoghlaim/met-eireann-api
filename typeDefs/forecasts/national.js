const { GraphQLObjectType, GraphQLString } = require('graphql');

const NationalForecastType = new GraphQLObjectType({
  name: 'NationalForecast',
  fields: () => ({
    region: { type: GraphQLString },
    issued: { type: GraphQLString },
    today: { type: GraphQLString },
    tonight: { type: GraphQLString },
    tomorrow: { type: GraphQLString },
    outlook: { type: GraphQLString },
  }),
});

module.exports = NationalForecastType;
