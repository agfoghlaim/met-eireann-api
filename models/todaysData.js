class TodaysDataModel{
  constructor(data) {
  
    this.data = {};
    this.data.hourly = data;

  }

  // doStuff(data) {
  //   console.log(data[0]);
  // }
}
module.exports = TodaysDataModel;