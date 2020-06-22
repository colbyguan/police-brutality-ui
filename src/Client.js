import DataFrame from "dataframe-js";

const PHP_API_URL = 'https://api.846policebrutality.com/api/incidents'
const OFFICIAL_URL = 'https://raw.githubusercontent.com/2020PB/police-brutality/data_build/all-locations.json'

const getPHPAPIDataFrame = () => {
    return fetch(PHP_API_URL)
    .then(response => response.json())
    .then(json => {
        if (!('data' in json)) {
            throw `Missing key 'data' in Github response`
        }
        const dataArray = json.data;
        let df = new DataFrame(dataArray, 
            ['id', 'pb_id', 'state', 'city', 'date', 'title', 'links'])
        // Hour:min:seconds messes with stuff; API does not appear to have H:M:S info
        df.map(row => {
            const rawDate = new Date(row.get('date'))
            if (!rawDate) {
                row.set('date', new Date(0));
            }
            row = row.set('date', new Date(rawDate.getFullYear(), rawDate.getMonth(), rawDate.getDate()))
        });
        return df;
    });
}

const getOfficialAPIDataFrame = () => {
    return fetch(OFFICIAL_URL)
        .then(response => response.json())
        .then(json => {
            if (!('data' in json)) {
                throw `Missing key 'data' in Github response`
            }
            const dataArray = json.data;
            let df = new DataFrame(dataArray,
                ['id', 'state', 'city', 'date', 'name', 'links'])
            // Hour:min:seconds messes with stuff; API does not appear to have accurate H:M:S info
            df = df.map(row => {
                const rawDate = new Date(row.get('date'))
                let newRow;
                if (!row.get('date')) {
                    newRow = row.set('date', 946684800000)
                } else {
                    newRow = row.set('date', new Date(rawDate.getFullYear(), rawDate.getMonth(), rawDate.getDate() + 1).getTime() + 25200000);
                }
                return newRow;
            });
            return df;
        });
}

export { getPHPAPIDataFrame, getOfficialAPIDataFrame }

