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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    forecasts: {
      type: new GraphQLList(BlockForecastType),
      async resolve(parent, args) {
        const forecasts = await getBlockForecast();
        return forecasts;
      }
    },
    seaCrossings: {
      type: SeaCrossingForecastType,
      async resolve(parent, args) {
        const seaCrossings = await getLiveTextForecast('xsea_crossings');

        return seaCrossings;
      }
    },
    countyForecast: {
      type: CountyForecastType,
      args: { counties: { type: new GraphQLList(GraphQLString) } },
      async resolve(parent, args) {
        const countyForecast = await getLiveTextForecast(
          'county_forecast',
          args
        );
        return countyForecast;
      }
    },
    // NB TODO - limit regional args to Connaught, Leinster... etc
    regionalForecast: {
      type: RegionalForecastType,
      args: { region: { type: GraphQLString } },
      async resolve(parent, args) {
        const regionalForecast = await getLiveTextForecast(`x${args.region}`);
        return regionalForecast;
      }
    },
    nationalForecast: {
      type: NationalForecastType,
      async resolve() {
        const nationalForecast = await getLiveTextForecast('xNational');
        return nationalForecast;
      }
    },
    inlandLakeForecast: {
      type: InlandLakeForecastType,
      async resolve() {
        const inlandLakeForecast = await getLiveTextForecast(
          'xInland_Lake_Forecast'
        );
        return inlandLakeForecast;
      }
    },
    farmingForecast: {
      type: FarmingForecastType,
      async resolve() {
        const farmingForecast = await getLiveTextForecast('fcom');
        return farmingForecast;
      }
    },
    coastal: {
      type: CoastalForecastType,
      async resolve() {
        const coastalForecast = await getLiveTextForecast('xcoastal');

        return coastalForecast;
      }
    },
    presentObservations: {
      type: PresentObservationsForecastType,
      async resolve() {
        const presentObservations = await getLiveTextForecast('obs_present');
        return presentObservations;
      }
    },
    outlook: {
      type: OutlookForecastType,
      async resolve() {
        const outlook = await getLiveTextForecast('xOutlook');
        return outlook;
      }
    },
    webThreeDayForecast: {
      type: WebThreeDayForecastType,
      async resolve() {
        const webThreeDayForecast = await getLiveTextForecast(
          'web-3Dayforecast'
        );
        return webThreeDayForecast;
      }
    },
    webForecast: {
      type: WebForecastType,
      async resolve() {
        const webForecast = await getLiveTextForecast('web-forecast');

        return webForecast;
      }
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

function getModalName(name) {
  switch (name) {
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

function dynamicClass(name) {
  const modal = getModalName(name);
  return modal;
}

function XMLToJson(xml) {
  let ans;
  parseString(xml, (err, result) => {
    if (err) throw new Error('Error parsing XML');
    ans = result;
  });
  return ans;
}

// TODO these functions only differ by url....
async function getLiveTextForecast(liveTextForecastType, args) {
  const url = `https://www.met.ie/Open_Data/xml/${liveTextForecastType}.xml`;
  try {
    const xmlResponse = await axios.get(url);
    const parsedResponse = XMLToJson(xmlResponse.data);

    const relevantForecastModel = dynamicClass(liveTextForecastType);
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

module.exports = new GraphQLSchema({
  query: RootQuery
});
