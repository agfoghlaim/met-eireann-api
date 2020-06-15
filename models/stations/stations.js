//  A list of ME stations for monthly, today & yesterday data queries. Compiled manually from ME's datasets on data.gov.ie
const STATIONS = [
  {
    name: 'Valentia Observatory',
    monthly: 'Valentia Observatory',
    todayYesterday: 'valentia',
  },
  {
    name: 'Sherkin Island',
    monthly: 'Sherkin Island',
    todayYesterday: 'sherkin-island',
  },
  {
    name: 'Shannon Airport',
    monthly: 'Shannon Airport',
    todayYesterday: 'shannon',
  },
  {
    name: 'Roches Point',
    monthly: 'Roches Point',
    todayYesterday: 'roches-point',
  },
  {
    name: 'Phoenix Park',
    monthly: 'Phoenix Park',
    todayYesterday: 'phoenix-park',
  },
  { name: 'Oak Park', monthly: 'Oak Park', todayYesterday: 'oak-park' },
  {
    name: 'Newport Furnace',
    monthly: 'Newport Furnace',
    todayYesterday: 'newport-furnace',
  },
  { name: 'Mullingar', monthly: 'Mullingar', todayYesterday: 'mullingar' },
  {
    name: 'Mount Dillon',
    monthly: 'Mount Dillon',
    todayYesterday: 'mt-dillon',
  },
  { name: 'Moore Park', monthly: 'Moore Park', todayYesterday: 'moore-park' },
  {
    name: 'Markree Castle',
    monthly: 'Markree Castle',
    todayYesterday: 'Markree-Castle',
  },
  { name: 'Malin Head', monthly: 'Malin Head', todayYesterday: 'malin-head' },
  {
    name: 'Mace Head',
    monthly: 'Mace Head',
    todayYesterday: 'mace-head',
  },
  {
    name: 'Knock Airport',
    monthly: 'Knock Airport',
    todayYesterday: 'knock',
  },
  {
    name: 'Johnstown Castle',
    monthly: 'Johnstown Castle',
    todayYesterday: 'johnstown',
  },
  {
    name: 'Gurteen',
    monthly: 'Gurteen',
    todayYesterday: 'gurteen',
  },
  {
    name: 'Finner Camp',
    monthly: 'Finner Camp',
    todayYesterday: 'finner',
  },
  {
    name: 'Dunsany (Grange)',
    monthly: 'Dunsa (Grange)',
    todayYesterday: 'dunsany',
  },
  {
    name: 'Cork Airport',
    monthly: 'Cork Airport',
    todayYesterday: 'cork',
  },
  {
    name: 'Claremorris',
    monthly: 'Claremorris',
    todayYesterday: 'claremorris',
  },
  {
    name: 'Casement Aerodrome',
    monthly: 'Casement Aerodrome',
    todayYesterday: 'casement',
  },
  {
    name: 'Belmullet',
    monthly: 'Belmullet',
    todayYesterday: 'belmullet',
  },
  {
    name: 'Ballyhaise',
    monthly: 'Ballyhaise',
    todayYesterday: 'ballyhaise',
  },
  {
    name: 'Athenry',
    monthly: 'Athenry',
    todayYesterday: 'athenry',
  },
  {
    name: 'Dublin Airport',
    monthly: 'Dublin Airport',
    todayYesterday: 'dublin',
  },
];
module.exports = {
  // some querys to ME for monthlyData fail without capital letters. I cannot be bothered making this foolproof.
  //Update: I think the lowercase/hyphenated STATIONS.todayYesterday versions may work for both monthly and today/yesterday queries - TODO - check this.

  stationNamesForMonthlyDataEndpoint: () =>
    STATIONS.map((station) => station.name),

  stationNamesForTodayYesterdayDataEndpoints: () =>
    STATIONS.map((station) => station.todayYesterday),
};
