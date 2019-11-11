import axios from 'axios';

export const domain = 'rebuilder-api.herokuapp.com';
const url = `https://${domain}`;
const authPath = '/auth';
const loginPath = '/login';
const getUser = '/user';
const updateUser = '/update';
const registerPath = '/register';
const projectsPath = '/projects';
const newProjectPath = '/new';
const deployPath = '/deploy';
const templatesPath = '/templates';

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

        return axios.post(loginUrl, body);
    },

    loginByToken: (token) => {
        const loginUrl = url + authPath + getUser;

        const body = {};
        body.token = token;

        return axios.post(loginUrl, body);
    },

    register: (username, password, email, imageUrl) => {
        if(!username || !password || !email || !imageUrl) {
            return;
        }

        const registerUrl = url + authPath + registerPath;
        const body = { username, password, email, imageUrl };

        return axios.post(registerUrl, body);
    },

    createProject: (projectName, projectUrl, token, project) => {
        if(!projectName || !projectUrl) {
            return;
        }
        const newProjectUrl = url + projectsPath + newProjectPath;
        const body = { 
            name: projectName,
            projectImageUrl: projectUrl,
            authorization: `Bearer ${token}`
        };
        if(project) {
            body.project = project;
        }

        return axios.post(newProjectUrl, body);
    },

    getProject: (projectId, token) => {
        if(!projectId || !token) {
            return;
        }

        const getProjectUrl = url + projectsPath + `/${projectId}`;
        const body = {
            authorization: `Bearer ${token}`
        };

        return axios.post(getProjectUrl, body);
    },

    updateProject: (projectId, pages, token) => {
        if(!projectId || !pages || !token) {
            return;
        }

        const updateProjectUrl = url + projectsPath + `/${projectId}`;
        let body = { pages, authorization: `Bearer ${token}` };

        return axios.post(updateProjectUrl, body);
    },

    getDeploymentInformation: (projectId, token) => {
        if(!projectId || !token) {
            return;
        }

        const deployProjectUrl = url + projectsPath + `/${projectId}` + deployPath;

        return axios.get(deployProjectUrl);
    },

    getProjectTemplates: (projectId, token) => {
        if(!projectId || !token) {
            return;
        }

        const templatesUrl = url + projectsPath + `/${projectId}` + templatesPath;
        const body = {
            authorization: `Bearer ${token}`
        }

        return axios.post(templatesUrl, body);
    },

    deployProject: (projectId, token) => {
        if(!projectId || !token) {
            return;
        }

        const deployProjectUrl = url + projectsPath + `/${projectId}` + deployPath;
        
        const body = {
            authorization: `Bearer ${token}`
        }

        return axios.post(deployProjectUrl, body);
    },
    uploadImage: (formData) => {
        if(!formData) {
            return;
        }

        const clientId = '778d0d89a9bcabc';
        const authenticationObject = { 'headers': {'Authorization': `Client-ID ${clientId}`}};
        return axios.post('https://api.imgur.com/3/image/', formData, authenticationObject);
    },

    updateUser: (userInformation, token) => {
        if(!token) {
            return;
        }

        userInformation.token = token;
        const updateUserUrl = url + authPath + getUser + updateUser;

        return axios.post(updateUserUrl, userInformation);
    }
};

export default apiService;