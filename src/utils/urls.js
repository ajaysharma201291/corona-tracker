export const GET_WORLD_DATA = `https://disease.sh/v2/all`;
export const GET_ALL_CONTINENT_DATA = `https://disease.sh/v2/continents`;
export const GET_CONTINENT_DATA = (continentName) => `https://disease.sh/v2/continents/${continentName}`;
export const GET_ALL_COUNTRIES_DATA = `https://disease.sh/v2/countries`;
export const GET_COUNTRY_DATA = (countryName) => `https://disease.sh/v2/countries/${countryName}`;
// export const GET_TIME_SERIES_DATA = `https://api.covid19india.org/v3/min/timeseries.min.json`;
export const GET_INDIA_DATA = `https://api.covid19india.org/v3/min/data.min.json`;
export const GET_LATEST_LOGS = `https://api.covid19india.org/updatelog/log.json`;
// export const GET_HISTORICAL_DATA = (date) => `https://api.covid19india.org/v3/min/data-2020-05-30.min.json`