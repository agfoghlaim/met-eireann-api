class CountyForecastModel {
  constructor(data, args) {
    const selectedCounties = args.counties;
    const copyData = data;
    this.forecast = this.flattenDataAndFilterSelectedCounties(
      copyData,
      selectedCounties
    );
  }

  flattenDataAndFilterSelectedCounties(copyData, selected) {
    // append selected to the object(can't pass as param)
    copyData.selected = selected;

    const forecastsInNiceFlatFormat = [
      this.selectedCountiesOnly,
      this.doTime,
      this.doIssued,
      this.doCounties,
      this.removeUnusedKeysAndValues
    ].reduce((copyData, fn) => {
      return fn(copyData);
    }, copyData);
    return forecastsInNiceFlatFormat;
  }

  selectedCountiesOnly(data) {
    const selected = data.selected;

    if (!selected) return data;

    let ans = data;
    ans = selected.reduce((acc, now) => {
      let keepThisCounty = data.forecast.county.filter(
        county => county.name[0] === now.toUpperCase()
      )[0];

      acc.push(keepThisCounty);
      return acc;
    }, []);
    data.forecast.county = ans;
    return data;
  }

  doTime(data) {
    data.time = data.forecast.$.time;
    return data;
  }

  doIssued(data) {
    data.issued = data.forecast.$.issued;
    return data;
  }

  doCounties(data) {
    // data.counties is a new key | data.forecast(.county) will be removed in next function
    data.counties = data.forecast.county.map(c => {
      let county = {};
      county.name = c.name[0];
      county.days = c.day.map(d => {
        for (let [key, value] of Object.entries(d)) {
          d[key] = value[0];
          if (key === 'wind_speed') {
            // the only nested object
            d[key] = { value: value[0]._.trim(), units: value[0].$.units };
          }
        }
        return d;
      });
      return county;
    });

    return data;
  }

  removeUnusedKeysAndValues(data) {
    // ie. remove 'data.selected' (appended above) and 'data.forecast' (parsed form xml)
    return {
      time: data.time,
      issued: data.issued,
      counties: data.counties
    };
  }
}

module.exports = CountyForecastModel;

// This works perfectly, above is attempt at being more functional programming
// class CountyForecastModel {
//   constructor(data, args) {
//     const { counties } = args;

//     const copyData = data;
//     copyData.forecast.county = this.selectedCountiesOnly(counties, copyData.forecast.county);

//     this.forecast = this.altReduce(copyData);

//   }

//   selectedCountiesOnly(selected, data) {
//     console.log(selected)
//     if (!selected) return data;
//     let ans = data;

//     ans = selected.reduce((acc, now) => {
//       let keep = data.filter(county => county.name[0] === now.toUpperCase())[0];

//       acc.push(keep);
//       console.log("acc", acc)
//       return acc;
//     }, []);
//     // console.log("ans", ans)
//     return ans;
//   }

//   altReduce(data, selectedCounties) {
//     // console.log("be one", data)
//     let newData = {};
//     newData.time = data.forecast.$.time;
//     newData.issued = data.forecast.$.issued;
//     newData.counties = [];

//     // If specific counties are selected, filter first
//     // data.forecast.county = this.selectedCountiesOnly(
//     //   selectedCounties,
//     //   data.forecast.county
//     // );

//     newData.counties = data.forecast.county.map(c => {
//       let county = {};
//       county.name = c.name[0];
//       county.days = c.day.map(d => {
//         for (let [key, value] of Object.entries(d)) {
//           d[key] = value[0];
//           if (key === 'wind_speed') {
//             d[key] = { value: value[0]._.trim(), units: value[0].$.units };
//           }
//         }
//         return d;
//       });
//       return county;
//     });

//     return newData;
//   }
// }

// module.exports = CountyForecastModel;
