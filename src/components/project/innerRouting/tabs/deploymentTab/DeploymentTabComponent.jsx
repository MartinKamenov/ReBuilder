import React, { useState, useEffect, useCallback } from 'react';
import ButtonComponent from '../../../../common/button/ButtonComponent';
import PropTypes from 'prop-types';
import websocketService from '../../../../../service/websocket.service';
import ProgressBarComponent from '../../../../common/progress-bar/ProgressBarComponent';
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

    const addDeploymentMessage = useCallback(async({ data }) => {
        let message;
        // Adding try catch cause we recieve blob type of object which hasn't been sended by the API
        try {
            message = JSON.parse(data);
        } catch(er) {
            return;
        }
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
    }, []);

    useEffect(() => {
        const createdConnection = websocketService.connectDeployment(id);
        createdConnection.onmessage = addDeploymentMessage;
    }, [id, addDeploymentMessage]);

    const visualizeDeploymentInformation = () => {
        if(typeof deploymentInformation === 'string') {
            return <div>{deploymentInformation}</div>;
        }

        if(!deploymentInformation.deployUrl) {
            return <div>{deploymentInformation.status}</div>;
        }

        return (
            <ButtonComponent
                style={{ display: 'block' }}
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
            { deploymentStarted ? (<h3 className='deployment-message'>Project is being deployed. This may take couple of minutes...</h3>) : null }
            <div className='deployment-messages-container'>
                {deploymentMessages.map((message, i) => (
                    <div key={i}>{message.message}</div>
                ))}
            </div>
            <div style={{ margin: 'auto', width: 250 }}>
            
                {deploymentInformation ?
                    (visualizeDeploymentInformation()):
                    (<div>Fetching deployment info...</div>)}
                <ButtonComponent
                    style={{ width: '250px', display: 'block', margin: 'auto' }}
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