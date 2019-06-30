import axios from 'axios';

const url = 'https://rebuilder-api.herokuapp.com';
const authPath = '/auth';
const loginPath = '/login';
const registerPath = '/register';
const projectsPath = '/projects';
const newProjectPath = '/new';

const sendObject = {
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'withCredentials': true,
        'credentials': 'same-origin',
        'mode': 'same-origin',
        'headers': {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': true,
            'Access-Control-Allow-Credentials': true
        }
    }
};

const apiService = {
    login: (username, password) => {
        if(!username || !password) {
            return;
        }
        
        const query = `?username=${username}&password=${password}`;
        const loginUrl = url + authPath + loginPath + query;

        return axios.post(loginUrl, sendObject);
    },

    register: (username, password, passwordConfirm, email, imageUrl) => {
        if(!username || !password || !passwordConfirm || !email || !imageUrl ||
            (password !== passwordConfirm)) {
            return;
        }
        const query = `?username=${username}&password=${password}`;
        const registerUrl = url + authPath + registerPath + query;
        const body = { password_confirm: passwordConfirm, email, imageUrl };

        return axios.post(registerUrl, body, sendObject);
    },

    createProject: (projectName, projectUrl) => {
        if(!projectName || !projectUrl) {
            return;
        }
        const newProjectUrl = url + projectsPath + newProjectPath;
        const body = { projectName, projectUrl };

        return axios.post(newProjectUrl, body, secondSendObject);
    }
};

export default apiService;