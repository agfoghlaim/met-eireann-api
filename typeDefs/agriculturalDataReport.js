const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

// I don't know why but MÉ have used stuff like #text, @unit. I'm just going to ignore.

const Station = new GraphQLObjectType({
  name: 'Station',
  fields: () => ({
    name: { type: GraphQLString },
    temp: {
      type: new GraphQLObjectType({
        name: 'Temp',
        fields: () => ({
          text: { type: GraphQLString },
          unit: { type: GraphQLString },
        }),
      }),
    },
    tempDiff: {
      type: new GraphQLObjectType({
        name: 'TempDiff',
        fields: () => ({
          text: { type: GraphQLString },
          unit: { type: GraphQLString },
        }),
      }),
    },
    rain: {
      type: new GraphQLObjectType({
        name: 'Rain',
        fields: () => ({
          text: { type: GraphQLString },
          unit: { type: GraphQLString },
        }),
      }),
    },
    rainPer: { type: GraphQLString },
    sun: {
      type: new GraphQLObjectType({
        name: 'Sun',
        fields: () => ({
          unit: { type: GraphQLString },
        }),
      }),
    },
    sunPer: { type: GraphQLString },
    soil: {
      type: new GraphQLObjectType({
        name: 'Soil',
        fields: () => ({
          text: { type: GraphQLString },
          unit: { type: GraphQLString },
        }),
      }),
    },
    soilDiff: {
      type: new GraphQLObjectType({
        name: 'SoilDiff',
        fields: () => ({
          unit: { type: GraphQLString },
        }),
      }),
    },
    wind: {
      type: new GraphQLObjectType({
        name: 'Wind',
        fields: () => ({
          unit: { type: GraphQLString },
          text: { type: GraphQLString },
        }),
      }),
    },
    windDiff: {
      type: new GraphQLObjectType({
        name: 'WindDiff',
        fields: () => ({
          unit: { type: GraphQLString },
        }),
      }),
    },
    radiation: {
      type: new GraphQLObjectType({
        name: 'Radiation',
        fields: () => ({
          unit: { type: GraphQLString },
          text: { type: GraphQLString },
        }),
      }),
    },
    radiationPer: { type: GraphQLString },
  }),
});
const ValidType = new GraphQLObjectType({
  name: 'Valid',
  fields: () => ({
    from: { type: GraphQLString },
    to: { type: GraphQLString },
  }),
});
const AgriculturalDataReportType = new GraphQLObjectType({
  name: 'AgriculturalDataReport',
  fields: () => ({
    valid: { type: ValidType },
    station: { type: new GraphQLList(Station) },
  }),
});

module.exports = AgriculturalDataReportType;
