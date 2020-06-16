class TodaysDataModel{

  // can only accept a single station https://.../observations/${station}/today
  constructor(data, times) {
    let todaysData = data;
    if(times && data) {
      todaysData = this.filterTime(times, todaysData)
    }
    this.data = {};
    this.data.hourly = todaysData;
  }

  filterTime(times, data) {
    const dataOnRequestedHour = data.filter(d=>times.includes(d.reportTime));
    return dataOnRequestedHour.length ? dataOnRequestedHour : data;
  }

}
module.exports = TodaysDataModel;