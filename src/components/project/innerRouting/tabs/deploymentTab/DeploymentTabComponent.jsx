import React from 'react';
import ButtonComponent from '../../../../common/ButtonComponent';
import PropTypes from 'prop-types';

import './DeploymentTabComponent.css';

const DeploymentTabComponent = ({ handleDeployProject }) => (
    <div className='center-container'>
        <ButtonComponent
            onClick={handleDeployProject}
            title='Deploy project'
            type='primary'/>
    </div>
);

DeploymentTabComponent.propTypes = {
    handleDeployProject: PropTypes.func.isRequired
};
 
export default DeploymentTabComponent;