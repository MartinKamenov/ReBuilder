import React from 'react';
import ButtonComponent from '../../../../common/ButtonComponent';
import PropTypes from 'prop-types';

import './DeploymentTabComponent.css';

const DeploymentTabComponent = ({ handleDeployProject, deploymentInformation }) => (
    <div className='center-container'>
        {deploymentInformation ? 
            (<div>deploymentInformation</div>):
            (<div>No deployment info</div>)}
        <ButtonComponent
            style={{ width: '250px' }}
            onClick={handleDeployProject}
            title='Deploy project'
            type='primary'/>
    </div>
);

DeploymentTabComponent.propTypes = {
    handleDeployProject: PropTypes.func.isRequired,
    deploymentInformation: PropTypes.object
};
 
export default DeploymentTabComponent;