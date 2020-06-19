const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLEnumType,
} = require('graphql');

module.exports.DailyDataInput = new GraphQLEnumType({
  name: 'DailyDataInput',
  values: {
    CORK_AIRPORT: { value: 3904 },
    MOORE_PARK: { value: 575 },
    ROCHES_POINT: { value: 1075 },
    SHERKIN_ISLAND: { value: 775 },
    VALENTIA_OBSERVATORY: { value: 2275 },
    GURTEEN: { value: 1475 },
    SHANNON_AIRPORT: { value: 518 },
    JOHNSTOWN_CASTLE: { value: 1775 },
    OAK_PARK: { value: 375 },
    CASEMENT: { value: 3723 },
    DUBLIN_AIRPORT: { value: 532 },
    PHOENIX_PARK: { value: 175 },
    DUNSANY: { value: 1375 },
    MULLINGAR: { value: 1675 },
    ATHENRY: { value: 1875 },
    MACE_HEAD: { value: 275 },
    MT_DILLON: { value: 1975 },
    BELMULLET: { value: 2375 },
    CLAREMORRIS: { value: 2175 },
    KNOCK_AIRPORT: { value: 4935 },
    NEWPORT_FURNACE: { value: 833 },
    MARKREE: { value: 1275 },
    BALLYHAISE: { value: 675 },
    FINNER: { value: 2075 },
    MALIN_HEAD: { value: 1575 },
  },
});

module.exports.StationsInput = new GraphQLEnumType({
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

module.exports.RegionsInput = new GraphQLEnumType({
  name: 'RegionsInput',
  values: {
    CONNAUGHT: { value: 'Connacht' }, // this is how MÉ spell it, must have capital letter!
    ULSTER: { value: 'Ulster' }, // must have capital letter.
    LEINSTER: { value: 'Leinster' }, // must have capital letter.
    MUNSTER: { value: 'Munster' }, // must have capital letter.
    DUBLIN: { value: 'Dublin' }, // must have capital letter.
  },
});

module.exports.TimesInput = new GraphQLEnumType({
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

module.exports.StationDetailInput = new GraphQLEnumType({
  name: 'StationDetailInput',
  description: 'Open or closed, defaults to all',
  values: {
    OPEN: { value: 'OPEN' },
    CLOSED: { value: 'CLOSED' },
    ALL: { value: 'ALL' },
    MAIN: { value: 'MAIN' },
  },
});
module.exports.LocationsInput = new GraphQLEnumType({
  name: 'LocationsInput',
  values: {
    CORK: { value: 'Cork' },
    GALWAY: { value: 'Galway' },
    MAYO: { value: 'Mayo' },
    DONEGAL: { value: 'Donegal' },
    KERRY: { value: 'Kerry' },
    TIPPERARY: { value: 'Tipperary' },
    CLARE: { value: 'Clare' },
    LIMERICK: { value: 'Limerick' },
    ROSCOMMON: { value: 'Roscommon' },
    WEXFORD: { value: 'Wexford' },
    MEATH: { value: 'Meath' },
    KILKENNY: { value: 'Kilkenny' },
    WICKLOW: { value: 'Wicklow' },
    OFFALY: { value: 'Offaly' },
    CAVAN: { value: 'Cavan' },
    WATERFORD: { value: 'Waterford' },
    WESTMEATH: { value: 'Westmeath' },
    SLIGO: { value: 'Sligo' },
    LAOIS: { value: 'Laois' },
    KILDARE: { value: 'Kildare' },
    LEITRIM: { value: 'Leitrim' },
    MONAGHAN: { value: 'Monaghan' },
    LONGFORD: { value: 'Longford' },
    DUBLIN: { value: 'Dublin' },
    CARLOW: { value: 'Carlow' },
    LOUTH: { value: 'Louth' },
    BELFAST: { value: 'Belfast'}
  },
});

