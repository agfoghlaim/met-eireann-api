const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const OutlookType = new GraphQLObjectType({
  name:'OutlookType',
  fields: () =>({
    region: {type: GraphQLString},
    issued: {type: GraphQLString},
    outlook: {type: GraphQLString}
  })
})


module.exports = OutlookType;

