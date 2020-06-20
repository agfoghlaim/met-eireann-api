const { GraphQLObjectType, GraphQLString } = require('graphql');

const DailyDataType = new GraphQLObjectType({
  name: 'DailyData',
  fields: () => ({
    date: { type: GraphQLString, description: '00 to 00 utc' },
    rain: { type: GraphQLString, description: 'Precipitation Amount (mm)' },
    maxtp: { type: GraphQLString, description: 'Maximum Air Temperature (C)	' },
    mintp: { type: GraphQLString, description: 'Minimum  Air Temperature (C)' },
    gmin: {
      type: GraphQLString,
      description: '09utc Grass Minimum Temperature (C)',
    },
    soil: {
      type: GraphQLString,
      description: 'Mean 10cm soil temperature (C)',
    },
    cbl: { type: GraphQLString, description: 'Mean CBL Pressure (hpa)' },
    wdsp: { type: GraphQLString, description: 'Mean Wind Speed (kt)' },
    hm: {
      type: GraphQLString,
      description: 'Highest ten minute mean wind speed (kt)	',
    },
    ddhm: {
      type: GraphQLString,
      description: 'Wind Direction at max 10 min mean (deg)',
    },
    hg: { type: GraphQLString, description: 'Highest Gust (kt)' },
    pe: {
      type: GraphQLString,
      description: 'Potential Evapotranspiration (mm)',
    },
    evap: { type: GraphQLString, description: 'Evaporation (mm)' },
    smd_wd: {
      type: GraphQLString,
      description: 'Soil Moisture Deficits(mm) well drained',
    },
    smd_md: {
      type: GraphQLString,
      description: 'Soil Moisture Deficits(mm) moderately drained',
    },
    smd_pd: {
      type: GraphQLString,
      description: 'Soil Moisture Deficits(mm) poorly drained',
    },
    glorad: { type: GraphQLString, description: 'Global Radiation (J/cm sq.)' },
    ind: { type: GraphQLString, description: 'Indicator (i)' },
  }),
});

module.exports = DailyDataType;
