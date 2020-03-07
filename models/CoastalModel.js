class CostalModel {
  constructor(data){
   
    this.forecast = this.tidyCoastal(data)
    
  }

  tidyCoastal(data) {
    const newData = {}
    const short = data['coastal-reports'];
    newData.title = short.title[0];
    newData.validTime = short.coastalvalid[0].$['valid-time']
    newData.reports = short.report.map(report=>{

      return {
        label: report.label[0],
        text: report.text[0]
      }
    });
  
    return newData;
  }
}

module.exports = CostalModel;