import React, { useState, useEffect } from 'react';
import ButtonComponent from '../../../../common/ButtonComponent';
import PropTypes from 'prop-types';
import websocketService from '../../../../../service/websocket.service';
import ProgressBarComponent from '../../../../common/ProgressBarComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faPowerOff } from '@fortawesome/free-solid-svg-icons';

import './DeploymentTabComponent.css';

const DeploymentTabComponent = ({ id, handleDeployProject, deploymentInformation }) => {
    const [deploymentMessages, setDeploymentMessages] = useState([]);
    const [progress, setProgress] = useState(0);
    const [deploymentStarted, setDeploymentStarted] = useState(false);

    const openWebsite = (url) => {
        window.open(url, '_blank');
    };

    useEffect(() => {
        const createdConnection = websocketService.connectDeployment(id);
        createdConnection.onmessage = addDeploymentMessage;
    }, [id]);

    const deploymentCallback = (message) => {
        setDeploymentMessages((prev) => {
            const arr = [...prev];
            arr.push(message);
            const percentage = parseInt(((message.index + 1) / message.count) * 100, 10);
            if(percentage >= 100) {
                setDeploymentStarted(false);
            }
            setProgress(percentage);
            return arr;
        });
    };

    const addDeploymentMessage = async(evt) => {
        const data = evt.data;
        const message = JSON.parse(data);
        const percentage = parseInt(((message.index + 1) / message.count) * 100, 10);

        if(message.url) {
            setTimeout(() => {
                if(percentage >= 100) {
                    setDeploymentStarted(false);
                }
                deploymentCallback(message);
                setProgress(percentage);
                openWebsite(message.url);
            }, 20000);
            return;
        }

        deploymentCallback(message);
    };

    const visualizeDeploymentInformation = () => {
        if(typeof deploymentInformation === 'string') {
            return <div>{deploymentInformation}</div>;
        }

        if(!deploymentInformation.deployUrl) {
            return <div>{deploymentInformation.status}</div>;
        }

        return (
            <ButtonComponent
                className='open-deployment-btn'
                onClick={() => openWebsite(deploymentInformation.deployUrl)}
                type='success'
                title='Open application'>
                <FontAwesomeIcon icon={faPowerOff} />
                <span className='new-project-btn-text'>Open application</span>    
            </ButtonComponent>);
    };

    return (
        <div className='center-container'>
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
                onClick={() => {
                    if(!deploymentStarted) {
                        setDeploymentStarted(true);
                        handleDeployProject();
                    }
                }}
                type='primary'>
                <FontAwesomeIcon icon={faArrowUp} />
                <span className='new-project-btn-text'>Deploy project</span>
            </ButtonComponent>
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