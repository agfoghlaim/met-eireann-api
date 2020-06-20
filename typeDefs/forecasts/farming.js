const { GraphQLObjectType, GraphQLString } = require('graphql');

const TwoTextFields = new GraphQLObjectType({
  name: 'TwoTextFields',
  fields: () => ({
    title: { type: GraphQLString },
    text: { type: GraphQLString },
  }),
});

const FarmingForecastType = new GraphQLObjectType({
  name: 'FarmingForecast',
  fields: () => ({
    issued: { type: GraphQLString },
    rain: { type: TwoTextFields },
    temperature: { type: TwoTextFields },
    sunshine: { type: TwoTextFields },
    drying_conditions: { type: TwoTextFields },
    spraying: { type: TwoTextFields },
    field_conditions: { type: TwoTextFields },
  }),
});

module.exports = FarmingForecastType;
