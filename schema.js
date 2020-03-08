// TODO - in schemaModels - everything is string - use GraphQLFloat etc.
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat
} = require('graphql');

const axios = require('axios');
const parseString = require('xml2js').parseString;

// Models
const {
  BlockForecast,
  SeaCrossingForecast,
  CountyForecast,
  RegionalForecast,
  NationalForecast,
  InlandLakeForecast,
  FarmingForecast,
  CoastalForecast,
  PresentObservationsForecast,
  OutlookForecast,
  WebThreeDayForecast,
  WarningForecast,
  WebForecast
} = require('./models/forecasts');

// Types
const {
  BlockForecastType,
  SeaCrossingForecastType,
  CountyForecastType,
  RegionalForecastType,
  NationalForecastType,
  InlandLakeForecastType,
  FarmingForecastType,
  CoastalForecastType,
  PresentObservationsForecastType,
  OutlookForecastType,
  WebThreeDayForecastType,
  WarningForecastType,
  WebForecastType
} = require('./schema/forecasts');



const REGIONAL_FORECAST_REGIONS = [
  'Connaught',
  'Munster',
  'Leinster',
  'Ulster',
  'Dublin'
];
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    forecasts: {
      type: new GraphQLList(BlockForecastType),
      resolve: async (parent, args) => await getBlockForecast()
    },
    seaCrossings: {
      type: SeaCrossingForecastType,
      resolve: async (parent, args) =>
        await getLiveTextForecast('xsea_crossings')
    },
    countyForecast: {
      type: CountyForecastType,
      args: { counties: { type: new GraphQLList(GraphQLString) } },
      resolve: async (parent, args) =>
        await getLiveTextForecast('county_forecast', args)
    },
    regionalForecast: {
      type: RegionalForecastType,
      args: { region: { type: GraphQLString } },
      resolve: (parent, args) => regionalForecastResolver(args)
    },
    nationalForecast: {
      type: NationalForecastType,
      resolve: async () => await getLiveTextForecast('xNational')
    },
    inlandLakeForecast: {
      type: InlandLakeForecastType,
      resolve: async () => await getLiveTextForecast('xInland_Lake_Forecast')
    },
    farmingForecast: {
      type: FarmingForecastType,
      resolve: async () => await getLiveTextForecast('fcom')
    },
    coastal: {
      type: CoastalForecastType,
      resolve: async () => await getLiveTextForecast('xcoastal')
    },
    presentObservations: {
      type: PresentObservationsForecastType,
      resolve: async () => await getLiveTextForecast('obs_present')
    },
    outlook: {
      type: OutlookForecastType,
      resolve: async () => await getLiveTextForecast('xOutlook')
    },
    webThreeDayForecast: {
      type: WebThreeDayForecastType,
      resolve: async () => await getLiveTextForecast('web-3Dayforecast')
    },
    webForecast: {
      type: WebForecastType,
      resolve: async () => await getLiveTextForecast('web-forecast')
    }
    // Don't know how this should be structured - need to check next time there's weather warnings
    // warning: {
    //   type: WarningForecastType,
    //   async resolve() {
    //     const warning = await getLiveTextForecast(
    //       'xWarningPage'
    //     );
    //     return warning;
    //   }
    // }
  }
});


function liveTextForecastModelByURI(uri) {
  switch (uri) {
    case 'xsea_crossings':
      return SeaCrossingForecast;
    case 'county_forecast':
      return CountyForecast;
    case 'xConnacht':
      return RegionalForecast;
    case 'xMunster':
      return RegionalForecast;
    case 'xUlster':
      return RegionalForecast;
    case 'xLeinster':
      return RegionalForecast;
    case 'xDublin':
      return RegionalForecast;
    case 'xNational':
      return NationalForecast;
    case 'xInland_Lake_Forecast':
      return InlandLakeForecast;
    case 'fcom':
      return FarmingForecast;
    case 'xcoastal':
      return CoastalForecast;
    case 'obs_present':
      return PresentObservationsForecast;
    case 'xOutlook':
      return OutlookForecast;
    case 'web-3Dayforecast':
      return WebThreeDayForecast;
    case 'xWarningPage':
      return WarningForecast;
    case 'web-forecast':
      return WebForecast;
  }
}

function XMLToJson(xml) {
  let ans;
  parseString(xml, (err, result) => {
    if (err) throw new Error('Error parsing XML');
    ans = result;
  });
  return ans;
}

async function getLiveTextForecast(liveTextForecastType, args) {
  const url = `https://www.met.ie/Open_Data/xml/${liveTextForecastType}.xml`;

  try {
    const xmlResponse = await axios.get(url);
    const parsedResponse = XMLToJson(xmlResponse.data);
    const relevantForecastModel = liveTextForecastModelByURI(
      liveTextForecastType
    );

    const thisForecast = new relevantForecastModel(parsedResponse, args);

    return thisForecast.forecast;
  } catch (error) {
    throw new Error(`${error}. Couldn\'t get data from Met Eireann.`);
  }
}

async function getBlockForecast() {
  const url = `http://metwdb-openaccess.ichec.ie/metno-wdb2ts/locationforecast?lat=53.2719444;long=-9.0488889`;

  try {
    let xmlResponse = await axios.get(url);
    const parsedResponse = XMLToJson(xmlResponse.data);
    const theForecast = new BlockForecast(parsedResponse);

    return theForecast.forecasts;
  } catch (error) {
    throw new Error(
      `${error}. There was a problem communicating with Met Eireann\'s API.`
    );
  }
}

async function regionalForecastResolver(args) {
  if (!args.region) throw new Error('Please set region');

  if (!REGIONAL_FORECAST_REGIONS.includes(args.region)) {
    throw new Error(
      'Please set region. Available regions are Connaught, Munster, Leinster, Ulster, Dublin'
    );
  }
  const regionalForecast = await getLiveTextForecast(`x${args.region}`);
  return regionalForecast;
}

module.exports = new GraphQLSchema({
  query: RootQuery
});
