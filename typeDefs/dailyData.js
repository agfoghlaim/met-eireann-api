const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLFloat,
} = require('graphql');

/*
 DailyData will be...
 {
    legend: {
      rain: 'Precipitatino Amount (mm)', 
      maxtp: 'Maximum Air Temperature (C)', 
      ...},
    data: [
      {
        rain: 0.1, 
        maxtp: 8.3
      },{
        rain: 0.1, 
        maxtp: 8.3
      }...
    ]
  }
 */

const DailyDataLegendType = new GraphQLObjectType({
  name: 'DailyDataLegend',
  fields: () => ({
    date: { type: GraphQLString },
    rain: { type: GraphQLString },
    maxtp: { type: GraphQLString },
    mintp: { type: GraphQLString },
    gmin: { type: GraphQLString },
    soil: { type: GraphQLString },
    cbl: { type: GraphQLString },
    wdsp: { type: GraphQLString },
    hm: { type: GraphQLString },
    ddhm: { type: GraphQLString },
    hg: { type: GraphQLString },
    pe: { type: GraphQLString },
    evap: { type: GraphQLString },
    smd_wd: { type: GraphQLString },
    smd_md: { type: GraphQLString },
    smd_pd: { type: GraphQLString },
    glorad: { type: GraphQLString },
    ind: { type: GraphQLString },
  }),
});

const DailyDataDataType = new GraphQLObjectType({
  name: 'DailyDataData',
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

const DailyDataType = new GraphQLObjectType({
  name: 'DailyData',
  fields: () => ({
    legend: { type: DailyDataLegendType },
    data: { type: new GraphQLList(DailyDataDataType) },
  }),
});
module.exports = DailyDataType;
