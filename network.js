const axios = require("axios");

axios.interceptors.request.use((config) => {
    console.log(("do something for request"));
    return config;
});

axios.interceptors.response.use((response) => {
    console.log(("do something for response"));
    return response.data;
});

module.exports = axios;