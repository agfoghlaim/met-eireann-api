const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
} = require('graphql');

const StationDetail = new GraphQLObjectType({
  name: 'StationDetail',
  fields: () => ({
    county: { type: GraphQLString },
    stationNumber: { type: GraphQLInt },
    name: { type: GraphQLString },
    heightInMeters: { type: GraphQLInt },
    easting: { type: GraphQLInt },
    northing: { type: GraphQLInt },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
    openYear: { type: GraphQLInt },
    closeYear: { type: GraphQLInt },
    main: { type: GraphQLBoolean },
  }),
});

module.exports = StationDetail;
