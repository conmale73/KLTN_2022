import axios from "axios";

//const apiProduction = 'https://json-kali.onrender.com';
const apiProduction = "http://localhost:3000";
const apiDev = "http://localhost:3000";
const baseURL = import.meta.env.MODE === "production" ? apiProduction : apiDev;

const options = {
    url: "https://youtube-music-api-detailed.p.rapidapi.com/get_song",
    params: {
        video_id: "RS0FhoKAHvA",
    },
    headers: {},
};

const axiosClient = axios.create({
    baseURL,
    params: {
        video_id: "RS0FhoKAHvA",
    },
    headers: {
        "X-RapidAPI-Key": "da308698d9msh67f66deb34bcc30p1050e9jsn65844fb89609",
        "X-RapidAPI-Host": "youtube-music-api-detailed.p.rapidapi.com",
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
