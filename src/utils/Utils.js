export default class Utils {
    static basicCsvToJson(data) {
        data = data.trim()
                .split("\n")
                .map(str => str.split(","));
        let fields = data[0];
        data = data.slice(1).reduce((json, row) => {
          let rowObj = {};
          fields.forEach((field, index) => {
            rowObj[field] = row[index];
          })
          return json.concat(rowObj)
        }, []);
        return data;
    }

    static sortData = (order, data, field) => {
        return _.orderBy(data, [field], [order]);
    }
}
