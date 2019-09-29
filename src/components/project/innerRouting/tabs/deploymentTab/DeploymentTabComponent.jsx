import React, { useState, useEffect } from 'react';
import ButtonComponent from '../../../../common/ButtonComponent';
import PropTypes from 'prop-types';
import websocketService from '../../../../../service/websocket.service';

import './DeploymentTabComponent.css';

const DeploymentTabComponent = ({ id, handleDeployProject, deploymentInformation }) => {
    const [deploymentMessages, setDeploymentMessages] = useState([]);
    const [connection, setConnection] = useState({});

    useEffect(() => {
        websocketService.connectDeployment(id).then((res) => {
            debugger;
            const createdConnection = res;
            createdConnection.onMessage = addDeploymentMessage;
            setConnection(createdConnection);
        }).catch(er => {
            debugger;
            console.log(er);
        });
    }, []);

    const addDeploymentMessage = (evt) => {
        const data = evt.data;
        const message = JSON.parse(data);

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
    id: PropTypes.string.isRequired,
    handleDeployProject: PropTypes.func.isRequired,
    deploymentInformation: PropTypes.oneOfType(
        [ PropTypes.object, PropTypes.string ]
    )
};
 
export default DeploymentTabComponent;