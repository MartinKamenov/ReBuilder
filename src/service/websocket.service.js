import { domain } from './api.service';

const websocketUrl = `ws://${domain}`;

// TO DO: Implement websocket service for deployment information and deployment logs

const websocketService = {
    connectDeployment: (id) => {
        debugger;
        const connection = new WebSocket(websocketUrl + '/' + id);
        return connection;
    }
};

export default websocketService;