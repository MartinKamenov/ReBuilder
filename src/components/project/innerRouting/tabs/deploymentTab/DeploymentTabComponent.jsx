import React from 'react';
import ButtonComponent from '../../../../common/ButtonComponent';
import PropTypes from 'prop-types';

import './DeploymentTabComponent.css';

const DeploymentTabComponent = ({ handleDeployProject, deploymentInformation }) => {
    const visualizeDeploymentInformation = () => {
        if(typeof deploymentInformation === 'string') {
            return <div>{deploymentInformation}</div>;
        }

        return (<div>We are having deployment info</div>);
    }

    return (
    <div className='center-container'>
        {deploymentInformation ?
            (visualizeDeploymentInformation()):
            (<div>Fetching deployment info...</div>)}
        <ButtonComponent
            style={{ width: '250px' }}
            onClick={handleDeployProject}
            title='Deploy project'
            type='primary'/>
    </div>
)};

DeploymentTabComponent.propTypes = {
    handleDeployProject: PropTypes.func.isRequired,
    deploymentInformation: PropTypes.oneOfType(
        PropTypes.object, PropTypes.string
    )
};
 
export default DeploymentTabComponent;