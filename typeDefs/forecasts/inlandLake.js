const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

const OverviewType = new GraphQLObjectType({
  name: 'Overview',
  fields: () => ({
    time: { type: GraphQLString },
    head: { type: GraphQLString },
    text: { type: GraphQLString },
  }),
});

const LakeType = new GraphQLObjectType({
  name: 'Lake',
  fields: () => ({
    area: { type: GraphQLString },
    wind: { type: GraphQLString },
    visibility: { type: GraphQLString },
    windsovernight: { type: GraphQLString },
    outlook: { type: GraphQLString },
  }),
});

const InlandLakeForecastType = new GraphQLObjectType({
  name: 'InlandLake',
  fields: () => ({
    title: { type: GraphQLString },
    issued: { type: GraphQLString },
    overView: { type: OverviewType },
    lakes: { type: new GraphQLList(LakeType) },
  }),
});

module.exports = InlandLakeForecastType;
