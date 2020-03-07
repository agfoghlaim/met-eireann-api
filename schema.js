// TODO - in schemaModels - everything is string - use GraphQLFloat etc.
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat
} = require('graphql');

const fs = require('fs');
const axios = require('axios');
const parseString = require('xml2js').parseString;

// Models
const ForecastBlockModel = require('./models/ForecastBlockModel');
const SeaCrossingModel = require('./models/SeaCrossingModel');
const CountyForecastModel = require('./models/CountyForecastModel');
const RegionalForecastModel = require('./models/RegionalForecastModel');
const NationalForecastModel = require('./models/NationalForecastModel');
const InlandLakeForecastModel = require('./models/InlandLakeForecastModel');
const FarmingForecastModel = require('./models/FarmingForecastModel');
const CoastalModel = require('./models/CoastalModel');
const PresentObservationsModel = require('./models/PresentObservationsModel');
const OutlookModel = require('./models/OutlookModel');
const WebThreeDayForecastModel = require('./models/WebThreeDayForecastModel');
const WarningModel = require('./models/WarningModel');
const WebForecastModel = require('./models/WebForecastModel.js');

// Types
const ForecastBlockType = require('./schemaTypes/forecastBlock');
const SeaCrossingType = require('./schemaTypes/seaCrossing');
const CountyForecastType = require('./schemaTypes/countyForecast');
const RegionalForecastType = require('./schemaTypes/regionalForecast');
const NationalForecastType = require('./schemaTypes/nationalForecast');
const InlandLakeForecastType = require('./schemaTypes/inlandLakeForecast');
const FarmingForecastType = require('./schemaTypes/farmingForecast');
const CoastalType = require('./schemaTypes/Coastal');
const PresentObservationsType = require('./schemaTypes/presentObservations');
const OutlookType = require('./schemaTypes/outlook');
const WebThreeDayForecastType = require('./schemaTypes/webThreeDayForecast');
const WarningType = require('./schemaTypes/warning');
const WebForecastType = require('./schemaTypes/webForecast');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    forecasts: {
      type: new GraphQLList(ForecastBlockType),
      async resolve(parent, args) {
        const forecasts = await getBlockForecast();
        return forecasts;
      }
    },
    seaCrossings: {
      type: SeaCrossingType,
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
    InlandLakeForecast: {
      type: InlandLakeForecastType,
      async resolve() {
        const inlandLakeForecast = await getLiveTextForecast(
          'xInland_Lake_Forecast'
        );
        return inlandLakeForecast;
      }
    },
    FarmingForecast: {
      type: FarmingForecastType,
      async resolve() {
        const farmingForecast = await getLiveTextForecast('fcom');
        return farmingForecast;
      }
    },
    Coastal: {
      type: CoastalType,
      async resolve() {
        const coastalForecast = await getLiveTextForecast('xcoastal');

        return coastalForecast;
      }
    },
    PresentObservations: {
      type: PresentObservationsType,
      async resolve() {
        const presentObservations = await getLiveTextForecast('obs_present');
        return presentObservations;
      }
    },
    Outlook: {
      type: OutlookType,
      async resolve() {
        const outlook = await getLiveTextForecast('xOutlook');
        return outlook;
      }
    },
    WebThreeDayForecast: {
      type: WebThreeDayForecastType,
      async resolve() {
        const webThreeDayForecast = await getLiveTextForecast(
          'web-3Dayforecast'
        );
        return webThreeDayForecast;
      }
    },
    WebForecast: {
      type: WebForecastType,
      async resolve() {
        const webForecast = await getLiveTextForecast('web-forecast');

        return webForecast;
      }
    }
    // Don't know how this should be structured - need to check next time there's weather warnings
    // Warning: {
    //   type: WarningType,
    //   async resolve() {
    //     const warning = await getLiveTextForecast(
    //       'xWarningPage'
    //     );
    //     return warning;
    //   }
    // }
  }
});

const availableLiveTextForecastTypes = [
  // 'xOutlook',
  'county_forecast',
  // 'web-3Dayforecast',
  // 'xConnacht',
  // 'xMunster',
  // 'xDublin',
  // 'obs_present',
  // 'xcoastal',
  // 'fcom',
  // 'xWarningPage',
  'web-forecast'
  // 'xLeinster',
  // 'xUlster',
  // 'xInland_Lake_Forecast',
  // 'xConnacht',
  // 'xNational',
  // 'xsea_crossings'
];

function getModalName(name) {
  switch (name) {
    case 'xsea_crossings':
      return SeaCrossingModel;
    case 'county_forecast':
      return CountyForecastModel;
    case 'xConnacht':
      return RegionalForecastModel;
    case 'xMunster':
      return RegionalForecastModel;
    case 'xUlster':
      return RegionalForecastModel;
    case 'xLeinster':
      return RegionalForecastModel;
    case 'xDublin':
      return RegionalForecastModel;
    case 'xNational':
      return NationalForecastModel;
    case 'xInland_Lake_Forecast':
      return InlandLakeForecastModel;
    case 'fcom':
      return FarmingForecastModel;
    case 'xcoastal':
      return CoastalModel;
    case 'obs_present':
      return PresentObservationsModel;
    case 'xOutlook':
      return OutlookModel;
    case 'web-3Dayforecast':
      return WebThreeDayForecastModel;
    case 'xWarningPage':
      return WarningModel;
    case 'web-forecast':
      return WebForecastModel;
  }
}

function dynamicClass(name) {
  const modal = getModalName(name);
  return modal;
}

function toJsonAndwrite(data, fileName) {
  const json = JSON.stringify(data, null, 4);
  fs.writeFile(`${fileName}.json`, json, 'utf8', function() {
    console.log(`written to ${filename}.json`);
  });
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
  const theForecast = new ForecastBlockModel(parsedResponse);

  return theForecast.forecasts;
  } catch(error) {
    throw new Error(`${error}. There was a problem communicating with Met Eireann\'s API.`)
  }
}

module.exports = new GraphQLSchema({
  query: RootQuery
});

//https://data.gov.ie/dataset/weather-warnings
