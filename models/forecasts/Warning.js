class WarningModel {
  constructor(data) {
    this.forecast = {test: 'warning test'}
    this.tidyWarning(data)
  }

  tidyWarning(data) {
    
    const short = data.WebWarning;
    console.log(short.WarnType[0]['Warning-type'])
    const newData = {};
    newData.globalAwarenessLevel = {
      warning: short['global-awareness-level'][0]._,
      colourcode: short['global-awareness-level'][0].$.colourcode
    }
    newData.WarnType= {
      name: short.WarnType[0].$.name,
      order: short.WarnType[0].$.order,
      maxAwarenessLevel: short.WarnType[0].$['max-awareness-level']
    }
    newData.WarningType = {
      ID: short.WarnType[0]['Warning-type'][0].$.ID,
      order: short.WarnType[0]['Warning-type'][0].$.order,
      IssueTime: short.WarnType[0]['Warning-type'][0].IssueTime,
      ValidFromTime: short.WarnType[0]['Warning-type'][0].ValidFromTime,
      ValidToTime: short.WarnType[0]['Warning-type'][0].ValidToTime,
      ValidToTime: short.WarnType[0]['Warning-type'][0].ValidToTime,
      Header: short.WarnType[0]['Warning-type'][0].Header,
      WarnText: short.WarnType[0]['Warning-type'][0].WarnText
    }
     console.log(newData)
  }
}

module.exports = WarningModel;