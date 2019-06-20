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
        if(!username || !password) {
            return;
        }
        
        const query = `?username=${username}&password=${password}`;
        const loginUrl = url + authPath + loginPath + query;

        return axios.post(loginUrl, {}, sendObject);
    },

    register: (username, password, passwordConfirm, email, imageUrl) => {
        if(!username || !password || !passwordConfirm || !email || !imageUrl) {
            return;
        }
        const query = `?username=${username}&password=${password}`;
        const registerUrl = url + authPath + registerPath + query;
        const body = { password_confirm: passwordConfirm, email, imageUrl };

        return axios.post(registerUrl, body, sendObject);
    }
};

export default apiService;