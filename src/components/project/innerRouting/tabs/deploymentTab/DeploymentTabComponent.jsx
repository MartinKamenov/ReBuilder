import React, { useState, useEffect } from 'react';
import ButtonComponent from '../../../../common/ButtonComponent';
import PropTypes from 'prop-types';
import websocketService from '../../../../../service/websocket.service';
import ProgressBarComponent from '../../../../common/ProgressBarComponent';

import './DeploymentTabComponent.css';

const DeploymentTabComponent = ({ id, handleDeployProject, deploymentInformation }) => {
    const [deploymentMessages, setDeploymentMessages] = useState([]);
    const [progress, setProgress] = useState(0);
    const [deploymentStarted, setDeploymentStarted] = useState(false);


    useEffect(() => {
        const createdConnection = websocketService.connectDeployment(id);
        createdConnection.onmessage = addDeploymentMessage;
    }, []);

    const addDeploymentMessage = (evt) => {
        const data = evt.data;
        const message = JSON.parse(data);

        setDeploymentMessages((prev) => {
            const arr = [...prev];
            arr.push(message);
            setProgress(((message.index + 1) / message.count) * 100)
            return arr;
        });
    };

    const visualizeDeploymentInformation = () => {
        if(typeof deploymentInformation === 'string') {
            return <div>{deploymentInformation}</div>;
        }

        return (<div>We are having deployment info</div>);
    };

    return (
        <div className='center-container'>
            <h3>Deployment status</h3>
            <ProgressBarComponent progress={progress}/>
            <div className='deployment-messages-container'>
                {deploymentMessages.map((message, i) => (
                    <div key={i}>{message.message}</div>
                ))}
            </div>
            {deploymentInformation ?
                (visualizeDeploymentInformation()):
                (<div>Fetching deployment info...</div>)}
            <ButtonComponent
                style={{ width: '250px' }}
                onClick={handleDeployProject}
                title='Deploy project'
                type='primary'/>
        </div>
    );};

DeploymentTabComponent.propTypes = {
    id: PropTypes.string.isRequired,
    handleDeployProject: PropTypes.func.isRequired,
    deploymentInformation: PropTypes.oneOfType(
        [ PropTypes.object, PropTypes.string ]
    )
};
 
export default DeploymentTabComponent;