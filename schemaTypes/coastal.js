const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');



const CostalReportType = new GraphQLObjectType({
  name: 'CostalReportType',
  fields: () => ({
    label: {type: GraphQLString},
    text: {type: GraphQLString}
  })
})

const CostalType = new GraphQLObjectType({
  name: 'CostalType',
  fields: () => ({
    title: { type: GraphQLString },
    validTime: {type: GraphQLString},
    reports: {type: new GraphQLList(CostalReportType)}

  })
});

module.exports = CostalType;

