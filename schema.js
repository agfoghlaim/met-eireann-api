const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLEnumType,
} = require('graphql');

const axios = require('axios');
const parseString = require('xml2js').parseString;
const fs = require('fs');

const DEFAULT_COORDINATES = {
  // Galway
  latitude: '53.2719444',
  longitude: '-9.0488889',
};

// #region Import Models
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
  WebForecast,
} = require('./models/forecasts');

const MonthlyData = require('./models/monthlyData');
const TodaysData = require('./models/todaysData');
const AgriculturalDataReport = require('./models/agriculturalDataReport');
const {
  stationNamesForMonthlyDataEndpoint,
  stationNamesForTodayYesterdayDataEndpoints,
} = require('./models/stations/stations');

//#endregion

// #region Import Types
const {
  ForecastType,
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
  WebForecastType,
} = require('./schema/forecasts');

const MonthlyDataType = require('./schema/monthlyData');
const TodaysDataType = require('./schema/todaysData');
const AgriculturalDataReportType = require('./schema/agriculturalDataReport');
const StationDetailType = require('./schema/stationDetail');
//#endregion

// #region Inputs
const StationsInput = new GraphQLEnumType({
  name: 'StationsInput',
  values: {
    VALENTIA_OBSERVATORY: { value: 'valentia' },
    SHERKIN_ISLAND: { value: 'sherkin-island' },
    SHANNON_AIRPORT: { value: 'shannon' },
    ROCHES_POINT: { value: 'roches-point' },
    PHOENIX_PARK: { value: 'phoenix-park' },
    OAK_PARK: { value: 'oak-park' },
    NEWPORT_FURNACE: { value: 'newport-furnace' },
    MULLINGAR: { value: 'newport-furnace' },
    MOUNT_DILLON: { value: 'mt-dillon' },
    MOORE_PARK: { value: 'moore-parkk' },
    MARKREE_CASTLE: { value: 'Markree-Castle' },
    MALIN_HEAD: { value: 'malin-head' },
    MACE_HEAD: { value: 'mace-head' },
    KNOCK_AIRPORT: { value: 'knock' },
    JOHNSTOWN_CASTLE: { value: 'johnstown' },
    GURTEEN: { value: 'gurteen' },
    FINNER_CAMP: { value: 'finner' },
    DUNSANY_GRANGE: { value: 'dunsany' },
    CORK_AIRPORT: { value: 'cork' },
    CLAREMORRIS: { value: 'claremorris' },
    CASEMENT_AERODROME: { value: 'casement' },
    BELMULLET: { value: 'belmullet' },
    BALLYHAISE: { value: 'ballyhaise' },
    ATHENRY: { value: 'athenry' },
    DUBLIN_AIRPORT: { value: 'dublin' },
  },
});

const RegionsInput = new GraphQLEnumType({
  name: 'RegionsInput',
  values: {
    CONNAUGHT: { value: 'Connacht' }, // this is how MÉ spell it, must have capital letter!
    ULSTER: { value: 'Ulster' }, // must have capital letter.
    LEINSTER: { value: 'Leinster' }, // must have capital letter.
    MUNSTER: { value: 'Munster' }, // must have capital letter.
    DUBLIN: { value: 'Dublin' }, // must have capital letter.
  },
});

const TimesInput = new GraphQLEnumType({
  name: 'TimesInput',
  description: "Reports are hourly. Eg _1 = '01:00'",
  values: {
    _1: { value: '01:00' },
    _2: { value: '02:00' },
    _3: { value: '03:00' },
    _4: { value: '04:00' },
    _5: { value: '05:00' },
    _6: { value: '06:00' },
    _7: { value: '07:00' },
    _8: { value: '08:00' },
    _9: { value: '09:00' },
    _10: { value: '10:00' },
    _11: { value: '11:00' },
    _12: { value: '12:00' },
    _13: { value: '13:00' },
    _14: { value: '14:00' },
    _15: { value: '15:00' },
    _16: { value: '16:00' },
    _17: { value: '17:00' },
    _18: { value: '18:00' },
    _19: { value: '19:00' },
    _20: { value: '20:00' },
    _21: { value: '21:00' },
    _22: { value: '22:00' },
    _23: { value: '23:00' },
    _00: { value: '00:00' },
  },
});

const StationDetailInput = new GraphQLEnumType({
  name: 'StationDetailInput',
  description: 'Open or closed, default to all',
  values: {
    OPEN: { value: 'OPEN' },
    CLOSED: { value: 'CLOSED' },
    ALL: { value: 'ALL' },
    MAIN: { value: 'MAIN' },
  },
});
//#endregion

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    forecasts: {
      type: ForecastType,
      args: { lat: { type: GraphQLString }, long: { type: GraphQLString } },
      resolve: async (parent, args) => await getBlockForecast(args),
    },
    seaCrossings: {
      type: SeaCrossingForecastType,
      resolve: async (parent, args) =>
        await getLiveTextForecast('xsea_crossings'),
    },
    countyForecast: {
      type: CountyForecastType,
      args: { counties: { type: new GraphQLList(GraphQLString) } },
      resolve: async (parent, args) =>
        await getLiveTextForecast('county_forecast', args),
    },
    regionalForecast: {
      type: RegionalForecastType,
      args: { region: { type: RegionsInput } },
      resolve: (parent, args) => regionalForecastResolver(args),
    },
    nationalForecast: {
      type: NationalForecastType,
      resolve: async () => await getLiveTextForecast('xNational'),
    },
    inlandLakeForecast: {
      type: InlandLakeForecastType,
      resolve: async () => await getLiveTextForecast('xInland_Lake_Forecast'),
    },
    farmingForecast: {
      type: FarmingForecastType,
      resolve: async () => await getLiveTextForecast('fcom'),
    },
    coastal: {
      type: CoastalForecastType,
      resolve: async () => await getLiveTextForecast('xcoastal'),
    },
    presentObservations: {
      type: PresentObservationsForecastType,
      args: { stations: { type: new GraphQLList(GraphQLString) } },
      resolve: async (parent, args) =>
        await getLiveTextForecast('obs_present', args.stations),
    },
    outlook: {
      type: OutlookForecastType,
      resolve: async () => await getLiveTextForecast('xOutlook'),
    },
    webThreeDayForecast: {
      type: WebThreeDayForecastType,
      resolve: async () => await getLiveTextForecast('web-3Dayforecast'),
    },
    webForecast: {
      type: WebForecastType,
      resolve: async () => await getLiveTextForecast('web-forecast'),
    },
    monthlyData: {
      type: MonthlyDataType,
      args: { station: { type: GraphQLString } },
      args: { station: { type: StationsInput } },
      resolve: (_, args) => getMonthlyData(args.station),
    },
    todaysData: {
      type: TodaysDataType,
      args: {
        station: { type: StationsInput },
        times: { type: new GraphQLList(TimesInput) },
      },
      resolve: (parent, args) => getTodaysOrYesterdaysData(args, 'today'),
    },
    yesterdaysData: {
      type: TodaysDataType,
      args: {
        station: { type: StationsInput },
        times: { type: new GraphQLList(TimesInput) },
      },
      resolve: (parent, args) => getTodaysOrYesterdaysData(args, 'yesterday'),
    },
    agriculturalDataReport: {
      type: AgriculturalDataReportType,
      resolve: () => getAgriculturalDataReport(),
    },
    stationNames: {
      type: new GraphQLList(GraphQLString),
      resolve: () => stationNamesForMonthlyDataEndpoint(),
    },
    stationNamesLowercase: {
      type: new GraphQLList(GraphQLString),
      resolve: () => stationNamesForTodayYesterdayDataEndpoints(),
    },
    warning: {
      type: WarningForecastType,
      async resolve() {
        const warning = await getLiveTextForecast('xWarningPage');
        return warning;
      },
    },
    stationDetails: {
      type: new GraphQLList(StationDetailType),
      args: { stationType: { type: StationDetailInput } },
      async resolve(_, args) {
        return getStationDetailsLocal(args);
      },
    },
  },
});

//#region Resolver's functions

async function getMonthlyData(station) {
  if (!station)
    throw new Error(
      `Provide station:stationName as an argument. Run stationNames query for a list of stations with monthlyData available.`
    );

  const url = `https://prodapi.metweb.ie/monthly-data/${station}`;
  try {
    const response = await axios.get(url);
    const temp = new MonthlyData(response.data);
    return temp.data;
  } catch (e) {
    throw new Error(
      `${e}. Use 'stationNames' query for a list of stations with monthlyData available.`
    );
  }
}

async function getTodaysOrYesterdaysData(args, day) {
  const { station, times } = args;

  const url = ` https://prodapi.metweb.ie/observations/${station}/${day}`;

  try {
    const response = await axios.get(url);
    const temp = new TodaysData(response.data, times); // badly named!
    return temp.data;
  } catch (e) {
    throw new Error(
      `${e}. Use 'stationNamesLowercase' query for a list of stations with todays data available.`
    );
  }
}

async function getAgriculturalDataReport() {
  const url = `https://prodapi.metweb.ie/agriculture/report`;
  try {
    const response = await axios.get(url);
    const temp = new AgriculturalDataReport(response.data);
    return temp.data;
  } catch (e) {
    throw new Error(e);
  }
}

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

async function getBlockForecast({ lat = '53.2719444', long = '-9.0488889' }) {
  if (!lat || !long) {
    const { latitude, longitude } = DEFAULT_COORDINATES;
    lat = latitude;
    long = longitude;
  }

  const url = `http://metwdb-openaccess.ichec.ie/metno-wdb2ts/locationforecast?lat=${lat};long=${long}`;

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

  const regionalForecast = await getLiveTextForecast(`x${args.region}`);
  return regionalForecast;
}

function getStationDetailsLocal({ stationType }) {
  console.log(stationType);
  const stations = JSON.parse(
    fs.readFileSync('./data/stationDetails.json', 'utf8')
  );
  if (stationType === 'OPEN') {
    return stations.filter((station) => station.closeYear === 0);
  } else if (stationType === 'CLOSED') {
    return stations.filter((station) => station.closeYear !== 0);
  } else if (stationType === 'MAIN') {
    return stations.filter((station) => station.main === true);
  } else {
    return stations;
  }
}
//#endregion endregion

module.exports = new GraphQLSchema({
  query: RootQuery,
});
