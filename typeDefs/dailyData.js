const { GraphQLObjectType, GraphQLString, GraphQLFloat  } = require('graphql');

const DailyDataType = new GraphQLObjectType({
  name: 'DailyData',
  fields: () => ({
    date: { type: GraphQLString, description: '00 to 00 utc' },
    rain: { type: GraphQLFloat, description: 'Precipitation Amount (mm)' },
    maxtp: { type: GraphQLFloat, description: 'Maximum Air Temperature (C)	' },
    mintp: { type: GraphQLFloat, description: 'Minimum  Air Temperature (C)' },
    gmin: {
      type: GraphQLString,
      description: '09utc Grass Minimum Temperature (C)',
    },
    soil: {
      type: GraphQLString,
      description: 'Mean 10cm soil temperature (C)',
    }, 
    cbl: { type: GraphQLFloat, description: 'Mean CBL Pressure (hpa)' },
    wdsp: { type: GraphQLFloat, description: 'Mean Wind Speed (kt)' },
    hm: {
      type: GraphQLFloat,
      description: 'Highest ten minute mean wind speed (kt)	',
    },
    ddhm: {
      type: GraphQLFloat,
      description: 'Wind Direction at max 10 min mean (deg)',
    },
    hg: { type: GraphQLFloat, description: 'Highest Gust (kt)' },
    pe: {
      type: GraphQLFloat,
      description: 'Potential Evapotranspiration (mm)',
    },
    evap: { type: GraphQLFloat, description: 'Evaporation (mm)' },
    smd_wd: {
      type: GraphQLFloat,
      description: 'Soil Moisture Deficits(mm) well drained',
    },
    smd_md: {
      type: GraphQLFloat,
      description: 'Soil Moisture Deficits(mm) moderately drained',
    },
    smd_pd: {
      type: GraphQLFloat,
      description: 'Soil Moisture Deficits(mm) poorly drained',
    },
    glorad: { type: GraphQLFloat, description: 'Global Radiation (J/cm sq.)' },
    ind: { type: GraphQLString, description: 'Indicator (i)' },
  }),
});

module.exports = DailyDataType;
