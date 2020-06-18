const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

const GlobalAwarenessLevelType = new GraphQLObjectType({
  name: 'GlobalAwarenessLevelType',
  fields: () => ({
    text: { type: GraphQLString },
    colourcode: { type: GraphQLString },
  }),
});

const WarningTypeType = new GraphQLObjectType({
  name: 'WarningTypeType',
  fields: () => ({
    awarenessLevel: { type: GraphQLString },
    issueTime: { type: GraphQLString },
    validFromTime: { type: GraphQLString },
    validToTime: { type: GraphQLString },
    header: { type: GraphQLString },
    warnText: { type: GraphQLString },
  }),
});
const WarnTypeMeta = new GraphQLObjectType({
  name: 'WarnTypeMeta',
  fields: () => ({
    id: { type: GraphQLString },
    order: { type: GraphQLString },
  }),
});
const WarnTypeType = new GraphQLObjectType({
  name: 'WarnTypeType',
  fields: () => ({
    meta: { type: WarnTypeMeta },
    warningType: { type: GraphQLList(WarningTypeType) },
  }),
});

const WarningType = new GraphQLObjectType({
  name: 'Warning',
  fields: () => ({
    globalAwarenessLevel: { type: GlobalAwarenessLevelType },
    warnType: { type: new GraphQLList(WarnTypeType) },
  }),
});

module.exports = WarningType;
