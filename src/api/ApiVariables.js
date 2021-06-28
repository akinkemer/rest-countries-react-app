import axios from "axios";

const restCountriesURL = "https://restcountries.eu/rest";

const axiosInstance = axios.create({ baseURL: restCountriesURL });

const apiVersion = "v2"

const requiredFieldsFilter="?fields=name;capital;region;flag"


export default axiosInstance;

export const all=`/${apiVersion}/all${requiredFieldsFilter}`;
