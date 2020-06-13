import DataFrame from "dataframe-js";

const REQUEST_URL = 'https://api.846policebrutality.com/api/incidents'

const getReportsDataFrame = () => {
    return fetch(REQUEST_URL)
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
            row.set('date', new Date(rawDate.getFullYear(), rawDate.getMonth(), rawDate.getDate()))
        });
        return df;
    });
}

export { getReportsDataFrame }

