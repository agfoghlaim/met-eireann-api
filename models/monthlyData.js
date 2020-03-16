class MonthlyDataModel {
  constructor(data) {
    this.data = this.addUnderscoresToKeysWithNumbers(data);
  }

  addUnderscoresToKeysWithNumbers(data) {
    const infoKeys = Object.keys(data);

    // I'm also changing 'mean' keys to '_mean'
    function renameKeysWithObjectsInsideAndDeleteOld(infoKey, data) {
      const short = data[infoKey].report;
      if (typeof data[infoKey] === 'object' && short) {
        // skip keys with string values ("station" and "up_to")
        for (let key of Object.keys(short)) {
          short[`_${key}`] = short[key]; // eg _2017
          delete short[key]; // eg 2017
        }
      }
      return data;
    }

    infoKeys.forEach(infoKey =>renameKeysWithObjectsInsideAndDeleteOld(infoKey, data));

    return data;
  }
}

module.exports = MonthlyDataModel;
