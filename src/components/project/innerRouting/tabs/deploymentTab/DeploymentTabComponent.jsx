import React, { useState, useEffect } from 'react';
import ButtonComponent from '../../../../common/ButtonComponent';
import PropTypes from 'prop-types';
import websocketService from '../../../../../service/websocket.service';

import './DeploymentTabComponent.css';

const DeploymentTabComponent = ({ handleDeployProject, deploymentInformation }) => {
    const [deploymentMessages, setDeploymentMessages] = useState([]);

    useEffect(() => {
        
    }, []);

    const addDeploymentMessage = (message) => {
        const deploymentMessagesCopy = [...deploymentMessages];

        deploymentMessagesCopy.push(message);

        setDeploymentMessages(deploymentMessagesCopy);
    }

    const visualizeDeploymentInformation = () => {
        if(typeof deploymentInformation === 'string') {
            return <div>{deploymentInformation}</div>;
        }

        return (<div>We are having deployment info</div>);
    };

    return (
        <div className='center-container'>
            <div>
                {deploymentMessages.map((message, i) => (
                    <div key={i}>{message}</div>
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
    handleDeployProject: PropTypes.func.isRequired,
    deploymentInformation: PropTypes.oneOfType(
        [ PropTypes.object, PropTypes.string ]
    )
};
 
export default DeploymentTabComponent;