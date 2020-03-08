const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');


// const CrossReportType = new GraphQLObjectType({
//   name: 'CrossReportType',
//   fields: () => ({
//     label: {type: GraphQLString},
//     text: {type: GraphQLString}
//   })
// })

const AwarenessLevelType = new GraphQLObjectType({
  name: 'AwarenessLevelType',
  fields: () => ({
    warning: {type: GraphQLString},
    colourcode: {type: GraphQLString}
  })
})

const WarnTypeType = new GraphQLObjectType({
  name: 'WarnTypeType',
  fields: () => ({
    name: {type: GraphQLString},
    order: {type: GraphQLString},
    maxAwarenessLevel: {type: GraphQLString},
  })
})

const WarningTypeType = new GraphQLObjectType({
  name: 'WarningTypeType',
  fields: () => ({
    ID: {type: GraphQLString},
    order: {type: GraphQLString},
    IssueTime: {type: GraphQLString},
    ValidFromTime: {type: GraphQLString},
    ValidToTime: {type: GraphQLString},
    Header: {type: GraphQLString},
    WarnText: {type: GraphQLString},
  })
})

const WarningType = new GraphQLObjectType({
  name: 'WarningType',
  fields: () => ({
    globalAwarenessLevel: { type: AwarenessLevelType},
    warnType: {type: WarnTypeType},
    warningType: {type: WarningTypeType}
 
  })
});

module.exports = WarningType;

