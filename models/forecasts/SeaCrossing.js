class SeaCrossingModel {

  constructor(parsedResponse) {
    function getCrossings(){
      const crossReports = parsedResponse.crossing['cross-report']
      const reports = crossReports.map(report=>{
        return {
         label: report.label[0],
         text: report.text[0]
        }
      })
      return reports
    }
   const ans = {
     crossings: {
       title: parsedResponse.crossing.title[0],
       crossingValid: {
         validTime: parsedResponse.crossing.crossingvalid[0].$['valid-time']
       },
       crossReports: [...getCrossings()]
     }
   }
  console.log("ans=", ans.crossings)
  this.forecast = ans.crossings;
  }
}

module.exports = SeaCrossingModel;