import axios from "axios";

//const apiProduction = 'https://json-kali.onrender.com';
const apiProduction = "http://localhost:5000";
const apiDev = "http://localhost:5000";
const baseURL = import.meta.env.MODE === "production" ? apiProduction : apiDev;

const axiosClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    function (req) {
        // const token = JSON.parse(localStorage.getItem("token"));
        // if (token) req.headers["auth-token"] = token;
        return req;
    },

    function (error) {
        return Promise.reject(error);
    }
);
axiosClient.interceptors.response.use(
    function (res) {
        return res;
    },

    function (error) {
        return Promise.reject(error);
    }
);
export default axiosClient;
