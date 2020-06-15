class TodaysDataModel{

  // can only accept a single station https://.../observations/${station}/today
  constructor(data, time) {
    let todaysData = data;
    console.log(time)
    if(time && data) {
      todaysData = this.filterTime(time, todaysData)
    }
    this.data = {};
    this.data.hourly = todaysData;
  }

  filterTime(time, data) {
    const dataOnRequestedHour = data.filter(d=>d.reportTime === time);
    return dataOnRequestedHour.length ? dataOnRequestedHour : data;
  }

}
module.exports = TodaysDataModel;