import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://mygaminglist-api-jmr.herokuapp.com/api"
})