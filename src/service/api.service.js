import axios from 'axios';

const url = 'http://192.168.0.107:5000';
const authPath = '/auth';
const loginPath = '/login';
const getUser = '/user';
const registerPath = '/register';
const projectsPath = '/projects';
const newProjectPath = '/new';
const deployPath = '/deploy';

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

    loginByToken: (token) => {
        const loginUrl = url + authPath + getUser;

        const body = {};
        body.token = token;

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
    },

    getProject: (projectId, token) => {
        if(!projectId || !token) {
            return;
        }

        const getProjectUrl = url + projectsPath + `/${projectId}`;
        sendObject.headers.Authorization = 'Bearer ' + token;

        return axios.post(getProjectUrl, {}, sendObject);
    },

    updateProject: (projectId, pages, token) => {
        if(!projectId || !pages || !token) {
            return;
        }

        const updateProjectUrl = url + projectsPath + `/${projectId}`;
        const body = { pages };
        sendObject.headers.Authorization = 'Bearer ' + token;

        return axios.post(updateProjectUrl, body, sendObject);
    },

    deployProject: (projectId, token) => {
        if(!projectId || !token) {
            return;
        }

        const deployProjectUrl = url + projectsPath + `/${projectId}` + deployPath;
        sendObject.headers.Authorization = 'Bearer ' + token;

        return axios.post(deployProjectUrl, {}, sendObject);
    }
};

export default apiService;