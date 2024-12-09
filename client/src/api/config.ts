import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api"

const privateApi = axios.create({ baseURL });
const publicApi = axios.create({ baseURL });

privateApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { privateApi, publicApi };