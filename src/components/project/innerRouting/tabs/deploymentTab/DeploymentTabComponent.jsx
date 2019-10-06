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

    const addDeploymentMessage = (evt) => {
        const data = evt.data;
        const message = JSON.parse(data);

        if(message.url) {
            setTimeout(() => {
                const percentage = parseInt(((message.index + 1) / message.count) * 100, 10);
                if(percentage >= 100) {
                    setDeploymentStarted(false);
                }
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
                setProgress(percentage);
                openWebsite(message.url);
            }, 20000);
            return;
        }

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
            <h3>Deployment status</h3>
            { deploymentStarted ? (
                <>
                    <ProgressBarComponent progress={progress}/>
                    <div className='deployment-messages-container'>
                        {deploymentMessages.map((message, i) => (
                            <div key={i}>{message.message}</div>
                        ))}
                    </div>
                </>
            ) : null }
            
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