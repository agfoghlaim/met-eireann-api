const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');


const CrossReportType = new GraphQLObjectType({
  name: 'CrossReportType',
  fields: () => ({
    label: {type: GraphQLString},
    text: {type: GraphQLString}
  })
})

const ValidTimeType = new GraphQLObjectType({
  name: 'ValidTimeType',
  fields: () => ({
    validTime: {type: GraphQLString}
  })
})

const SeaCrossingType = new GraphQLObjectType({
  name: 'SeaCrossingType',
  fields: () => ({
    title: { type: GraphQLString },
    crossingValid: {  type: ValidTimeType },
    crossReports: { type: new GraphQLList(CrossReportType)}
  })
});

module.exports = SeaCrossingType;

