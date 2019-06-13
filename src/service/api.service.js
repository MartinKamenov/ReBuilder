import axios from 'axios';

const url = 'https://rebuilder-api.herokuapp.com';
const authPath = '/auth';
const loginPath = '/login';
const registerPath = '/register';

const sendObject = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

const apiService = {
    login: (username, password) => {
        const loginUrl = url + authPath + loginPath;
        const body = { username, password };

        return axios.post(loginUrl, body, sendObject);
    },

    register: (username, email, password) => {
        const registerUrl = url + authPath + registerPath;
        const body = { username, email, password };

        return axios.post(registerUrl, body, sendObject);
    }
};

module.exports = apiService;