class WarningModel {
  constructor(data) {
    this.forecast = this.tidyWarning(data);
  }

  tidyWarning(data) {
    const short = data.WebWarning;
    const webWarning = {};

    webWarning.globalAwarenessLevel = {
      text: short['global-awareness-level'][0]._,
      colourcode: short['global-awareness-level'][0].$.colourcode,
    };

    webWarning.warnType = short.WarnType.map((warnType) => {
      const meta = {
        name: warnType.$.name,
        order: warnType.$.order,
        maxAwarenessLevel: warnType.$['max-awareness-level'],
      };

      const warningType = warnType['Warning-type'].map((warningType) => {
        const meta = { id: warningType.$.ID, order: warningType.$.order };
        const warningTypeBody = {
          awarenessLevel: warningType['awareness-level'][0],
          issueTime: warningType.IssueTime[0],
          validFromTime: warningType.ValidFromTime[0],
          validToTime: warningType.ValidToTime[0],
          header: warningType.Header[0],
          warnText: warningType.WarnText[0],
        };
        return { meta, ...warningTypeBody };
      });

      return { meta, warningType };
    });

    return webWarning;
  }
}

module.exports = WarningModel;
