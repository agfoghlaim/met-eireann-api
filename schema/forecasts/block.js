const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} = require('graphql');

const TemperatureType = new GraphQLObjectType({
  name: 'Temperature',
  fields: () => ({
    id: { type: GraphQLString },
    unit: { type: GraphQLString },
    value: { type: GraphQLFloat }
  })
});

const WindDirectionType = new GraphQLObjectType({
  name: 'WindDirection',
  fields: () => ({
    id: { type: GraphQLString },
    deg: { type: GraphQLFloat },
    name: { type: GraphQLString }
  })
});

const WindSpeedType = new GraphQLObjectType({
  name: 'WindSpeed',
  fields: () => ({
    id: { type: GraphQLString },
    mps: { type: GraphQLFloat },
    beaufort: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
});
const HumidityType = new GraphQLObjectType({
  name: 'Humidity',
  fields: () => ({
    value: { type: GraphQLFloat },
    unit: { type: GraphQLString }
  })
});
const PressureType = new GraphQLObjectType({
  name: 'Pressure',
  fields: () => ({
    id: { type: GraphQLString },
    unit: { type: GraphQLString },
    value: { type: GraphQLFloat }
  })
});
const CloudType = new GraphQLObjectType({
  name: 'Cloud',
  fields: () => ({
    id: { type: GraphQLString },
    percent: { type: GraphQLFloat }
  })
});
const DewpointTemperatureType = new GraphQLObjectType({
  name: 'DewpointTemperature',
  fields: () => ({
    id: { type: GraphQLString },
    unit: { type: GraphQLString },
    value: { type: GraphQLFloat }
  })
});
const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    altitude: { type: GraphQLInt },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat }
  })
});
const MainForecastType = new GraphQLObjectType({
  name: 'MainForecast',
  fields: () => ({
    temperature: { type: TemperatureType },
    windDirection: { type: WindDirectionType },
    windSpeed: { type: WindSpeedType },
    humidity: { type: HumidityType },
    pressure: { type: PressureType },
    cloudiness: { type: CloudType },
    lowClouds: { type: CloudType },
    mediumClouds: { type: CloudType },
    dewpointTemperature: { type: DewpointTemperatureType }
  })
});

const PrecipitationType = new GraphQLObjectType({
  name: 'Precipitation',
  fields: () => ({
    unit: { type: GraphQLString },
    value: { type: GraphQLFloat },
    minvalue: { type: GraphQLFloat },
    maxvalue: { type: GraphQLFloat }
  })
});
const SymbolType = new GraphQLObjectType({
  name: 'Symbol',
  fields: () => ({
    id: { type: GraphQLString },
    number: { type: GraphQLInt }
  })
});
const PrecipitationForecastType = new GraphQLObjectType({
  name: 'PrecipitationForecast',
  fields: () => ({
    precipitation: { type: PrecipitationType },
    symbol: { type: SymbolType }
  })
});

const ForecastBlockType = new GraphQLObjectType({
  name: 'ForecastBlock',
  fields: () => ({
    from: { type: GraphQLString },
    to: { type: GraphQLString },
    location: { type: LocationType },
    mainForecast: { type: MainForecastType },
    precipitationForecast: { type: PrecipitationForecastType }
  })
});

module.exports = ForecastBlockType;

