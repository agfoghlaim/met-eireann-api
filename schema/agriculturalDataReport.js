const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLScalarType } = require('graphql');

// I don't know why but MÉ have used stuff like #text, @unit. I'm just going to ignore the decoraters.
const HourlyDataType = new GraphQLObjectType({
  name: 'HourlyData',
  fields: () => ({
    name: { type: GraphQLString },
    temperature: { type: GraphQLString },
    symbol: { type: GraphQLString },
    weatherDescription: { type: GraphQLString },
    text: { type: GraphQLString },
    windSpeed: { type: GraphQLString },
    windGust: { type: GraphQLString },
    cardinalWindDirection: { type: GraphQLString },
    cardinalWindDirectionhumidity: { type: GraphQLString },
    rainfall: { type: GraphQLString },
    pressure: { type: GraphQLString },
    dayName: { type: GraphQLString },
    date: { type: GraphQLString },
    reportTime: { type: GraphQLString }
  })
});
// const TodaysDataType = new GraphQLObjectType({
//   name: 'TodaysData',
//   fields: () => ({
//     hourly: { type: new GraphQLList( HourlyDataType )}
//   })
// });

const Station = new GraphQLObjectType({
name: 'Station',
fields: () => ({
  temp: {type: new GraphQLObjectType({
    name: 'Temp',
    fields: () => ({
    text: {type: GraphQLString},
    unit: {type: GraphQLString},
    })
  })},
  tempDiff: {type: new GraphQLObjectType({
    name: 'TempDiff',
    fields: () => ({
    text: {type: GraphQLString},
    unit: {type: GraphQLString},
    })
  })},
  rain: {type: new GraphQLObjectType({
    name: 'Rain',
    fields: () => ({
    text: {type: GraphQLString},
    unit: {type: GraphQLString},
    })
  })},
  rainPer: {type:  GraphQLString},
  sun: {type: new GraphQLObjectType({
    name: 'Sun',
    fields: () => ({
    unit: {type: GraphQLString},
    })
  })},
  sunPer: {type:  GraphQLString},
  soil: {type: new GraphQLObjectType({
    name: 'Soil',
    fields: () => ({
    text: {type: GraphQLString},
    unit: {type: GraphQLString},
    })
  })},
  soilDiff: {type: new GraphQLObjectType({
    name: 'SoilDiff',
    fields: () => ({
    unit: {type: GraphQLString},
    })
  })},
  wind: {type: new GraphQLObjectType({
    name: 'Wind',
    fields: () => ({
    unit: {type: GraphQLString},
    text: {type: GraphQLString},
    })
  })},
  windDiff: {type: new GraphQLObjectType({
    name: 'WindDiff',
    fields: () => ({
    unit: {type: GraphQLString},
    })
  })},
  radiation: {type: new GraphQLObjectType({
    name: 'Radiation',
    fields: () => ({
    unit: {type: GraphQLString},
    text: {type: GraphQLString}
    })
  })},
  radiationPer: {type:  GraphQLString},
  
})
})
const ValidType = new GraphQLObjectType({
  name: 'ValidType',
  fields: () => ({
    from: {type: GraphQLString},
    to: {type: GraphQLString},
  })
})
const AgriculturalDataReportType = new GraphQLObjectType({
  name: 'AgriculturalDataReportType',
  fields: () => ({
    valid: {type: ValidType},
    station: { type: new GraphQLList(Station) }
  })
});

module.exports = AgriculturalDataReportType;
