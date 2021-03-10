const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');

// #region Resolvers
const { getMonthlyWeather } = require('./resolvers/monthlyWeather');
const { getTodaysWeather } = require('./resolvers/todaysWeather');
const { getYesterdaysWeather } = require('./resolvers/yesterdaysWeather');
const {
  getAgriculturalDataReport,
} = require('./resolvers/agriculturalDataReport');
const { getStationDetailsLocal } = require('./resolvers/stationDetails');
const { getDailyData } = require('./resolvers/dailyData');
const { getBlockForecast } = require('./resolvers/blockForecast');
const { getLiveTextForecast } = require('./resolvers/liveTextForecast');
const { getRegionalForecast } = require('./resolvers/regionalForecast');
// #endregion

// #region Models
const {
  stationNamesForMonthlyDataEndpoint,
  stationNamesForTodayYesterdayDataEndpoints,
} = require('./models/stations/stations');

//#endregion

// #region Type Defs
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
} = require('./typeDefs/forecasts');

const MonthlyWeatherType = require('./typeDefs/monthlyWeather');
const TodaysWeatherType = require('./typeDefs/todaysWeather');
const YesterdaysWeatherType = require('./typeDefs/yesterdaysWeather');
const AgriculturalDataReportType = require('./typeDefs/agriculturalDataReport');
const StationDetailType = require('./typeDefs/stationDetail');
const DailyDataType = require('./typeDefs/dailyData');
//#endregion

// #region Input Types
const {
  StationsInput,
  RegionsInput,
  TimesInput,
  StationDetailInput,
  DailyDataInput,
  LocationsInput,
  PresentObservationsInput,
  CountyForecastInput,
  monthlyWeatherStationInput,
} = require('./inputTypes/inputTypes');
//#endregion

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    forecast: {
      type: ForecastType,
      args: { lat: { type: GraphQLString }, long: { type: GraphQLString } },
      resolve: async (_, args) => await getBlockForecast(args),
    },
    seaCrossing: {
      type: SeaCrossingForecastType,
      resolve: async (_, args) => await getLiveTextForecast('xsea_crossings'),
    },
    countyForecast: {
      type: CountyForecastType,
      args: { counties: { type: new GraphQLList(CountyForecastInput) } },
      resolve: async (_, args) =>
        await getLiveTextForecast('county_forecast', args),
    },
    regionalForecast: {
      type: RegionalForecastType,
      args: { region: { type: RegionsInput } },
      resolve: (_, args) => getRegionalForecast(args),
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
      args: { stations: { type: new GraphQLList(PresentObservationsInput) } },
      resolve: async (_, args) =>
        await getLiveTextForecast('obs_present', args.stations),
    },
    outlook: {
      type: OutlookForecastType,
      resolve: async () => await getLiveTextForecast('xOutlook'),
    },
    webThreeDayForecast: {
      type: WebThreeDayForecastType,
      args: { locations: { type: new GraphQLList(LocationsInput) } },
      resolve: async (_, args) =>
        await getLiveTextForecast('web-3Dayforecast', args),
    },
    webForecast: {
      type: WebForecastType,
      resolve: async () => await getLiveTextForecast('web-forecast'),
    },
    monthlyWeather: {
      type: MonthlyWeatherType,
      args: { station: { type: monthlyWeatherStationInput } },
      resolve: (_, args) => getMonthlyWeather(args.station),
    },
    todaysWeather: {
      type: TodaysWeatherType,
      args: {
        station: { type: StationsInput },
        times: { type: new GraphQLList(TimesInput) },
      },
      resolve: (_, args) => getTodaysWeather(args, 'today'),
    },
    yesterdaysWeather: {
      type: YesterdaysWeatherType,
      args: {
        station: { type: StationsInput },
        times: { type: new GraphQLList(TimesInput) },
      },
      resolve: (_, args) => getYesterdaysWeather(args, 'yesterday'),
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
      description:
        "Use this version of the station names for Today's Weather and Yesterday/'s Weather",
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
    dailyData: {
      type: DailyDataType,
      description:
        'To get specific dates use "dates: ["14-aug-2004", "14-aug-2018","14-aug-2020"]". Year will be ignored if dates arg is present.',
      args: {
        station: { type: GraphQLNonNull(DailyDataInput) },

        dates: {
          type: new GraphQLList(GraphQLString),
        },
        year: {
          type: GraphQLString,
        },
      },
      async resolve(_, args) {
        return getDailyData(args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
