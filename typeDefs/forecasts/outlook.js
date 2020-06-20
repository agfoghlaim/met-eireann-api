const { GraphQLObjectType, GraphQLString } = require('graphql');

const OutlookType = new GraphQLObjectType({
  name: 'Outlook',
  fields: () => ({
    region: { type: GraphQLString },
    issued: { type: GraphQLString },
    outlook: { type: GraphQLString },
  }),
});

module.exports = OutlookType;
