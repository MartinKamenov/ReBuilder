import axios from 'axios';

const url = 'http://192.168.0.115:5000';
const authPath = '/auth';
const loginPath = '/login';
const registerPath = '/register';
const projectsPath = '/projects';
const newProjectPath = '/new';

const sendObject = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'headers': {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        }
    }
};

const apiService = {
    login: (username, password) => {
        if(!username || !password) {
            return;
        }
        
        const body = {
            username,
            password
        };
        const loginUrl = url + authPath + loginPath;

        return axios.post(loginUrl, body, sendObject);
    },

    register: (username, password, email, imageUrl) => {
        if(!username || !password || !email || !imageUrl) {
            return;
        }

        const registerUrl = url + authPath + registerPath;
        const body = { username, password, email, imageUrl };

        return axios.post(registerUrl, body, sendObject);
    },

    createProject: (projectName, projectUrl, token) => {
        if(!projectName || !projectUrl) {
            return;
        }
        const newProjectUrl = url + projectsPath + newProjectPath;
        const body = { name: projectName, projectImageUrl: projectUrl };
        sendObject.headers.Authorization = 'Bearer ' + token;

        return axios.post(newProjectUrl, body, sendObject);
    }
};

export default apiService;