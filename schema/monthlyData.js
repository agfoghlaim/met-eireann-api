const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');



const MonthsAndTotalType = new GraphQLObjectType({
  name: 'MonthsAndTotalType',
  fields: () => ({
    january: { type: GraphQLString},
    february: { type: GraphQLString },
    mar: { type: GraphQLString },
    apr: { type: GraphQLString },
    may: { type: GraphQLString },
    june: { type: GraphQLString },
    july: { type: GraphQLString },
    august: { type: GraphQLString },
    september: { type: GraphQLString },
    october: { type: GraphQLString },
    november: { type: GraphQLString },
    december: { type: GraphQLString },
    total: { type: GraphQLString }
  })
});
const MonthsAndAnnualType = new GraphQLObjectType({
  name: 'MonthsAndAnnualType',
  fields: () => ({
    january: { type: GraphQLString},
    february: { type: GraphQLString },
    mar: { type: GraphQLString },
    apr: { type: GraphQLString },
    may: { type: GraphQLString },
    june: { type: GraphQLString },
    july: { type: GraphQLString },
    august: { type: GraphQLString },
    september: { type: GraphQLString },
    october: { type: GraphQLString },
    november: { type: GraphQLString },
    december: { type: GraphQLString },
    annual: { type: GraphQLString }
  })
});
const ReportContents = new GraphQLObjectType({
  name: 'ReportContents',
  fields: () => ({
    _2017: { type: MonthsAndAnnualType },
    _2018: { type: MonthsAndAnnualType },
    _2019: { type: MonthsAndAnnualType },
    _2020: { type: MonthsAndAnnualType },
    _mean: { type: MonthsAndTotalType }
  })
});

const ReportType = new GraphQLObjectType({
  name: 'ReportType',
  fields: () => ({
    report: { type: ReportContents },
   
  })
});
const MonthlyData = new GraphQLObjectType({
  name: 'MonthlyData',
  fields: () => ({
    station: { type: GraphQLString },
    up_to: { type: GraphQLString },
    total_rainfall: { type: ReportType },
    mean_temperature: { type: ReportType },
    solar_radiation: { type: ReportType },
    potential_evapotranspiration: { type: ReportType },
    evaporation: { type: ReportType },
    degree_days_below_fiften_point_five_degrees_celsius: { type: ReportType },
    
  })
});

module.exports = MonthlyData;

