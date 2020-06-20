const fs = require('fs');

module.exports.getStationDetailsLocal = function ({ stationType }) {
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
};
