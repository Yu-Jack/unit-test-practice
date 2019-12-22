const axios = require("axios");

const login = (username) => {
    return axios.post("http://localhost:7070/api/login", {
        username,
    });
}

const register = (username) => {
    return axios.post("http://localhost:7070/api/register", {
        username,
    });
}

module.exports = {
    login,
    register,
}