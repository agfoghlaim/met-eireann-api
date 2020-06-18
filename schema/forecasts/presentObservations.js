const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

const ValueAndUnitType = new GraphQLObjectType({
  name: 'ValueAndUnit',
  fields: () => ({
    value: { type: GraphQLString },
    unit: { type: GraphQLString }
  })
});

const StationType = new GraphQLObjectType({
  name: 'StationType',
  fields: () => ({
    name: { type: GraphQLString },
    temp: { type: ValueAndUnitType },
    symbol: { type: GraphQLString },
    weather_text: { type: GraphQLString },
    wind_speed: { type: ValueAndUnitType },
    wind_direction: { type: GraphQLString },
    humidity: { type: ValueAndUnitType },
    rainfall: { type: ValueAndUnitType },
    pressure: { type: ValueAndUnitType }
  })
});

const PresentObservationsType = new GraphQLObjectType({
  name: 'PresentObservations',
  fields: () => ({
    time: { type: GraphQLString },
    stations: { type: new GraphQLList(StationType) }
  })
});

module.exports = PresentObservationsType;
