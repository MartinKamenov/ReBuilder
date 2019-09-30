import { domain } from './api.service';

const websocketUrl = `ws://${domain}`;

// TO DO: Implement websocket service for deployment information and deployment logs

const websocketService = {
    connectDeployment: (id) => {
        const connection = 
            new WebSocket(websocketUrl + '/' + id + '/deployment/status');
        return connection;
    }
};

export default websocketService;