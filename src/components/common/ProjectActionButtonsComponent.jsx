import React from 'react';

import ButtonComponent from './ButtonComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSave, faArrowAltCircleUp, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import './ProjectActionButtonsComponent.css';

const ProjectActionButtonsComponent = ({
        returnFunction,
        returnFunctionText,
        handleSaveProject,
        generateProject,
        handleDeployProject
    }) => {
    return (
        <div className='new-project-name-outer-container'>
            <div className='new-project-name-inner-container'>
                <div className='generate-project-btn-container'>
                    {returnFunction ? (
                        <ButtonComponent
                            type='danger'
                            className={`col-md-3 col-sm-6 project-action-btn`}
                            onClick={returnFunction}>
                            <FontAwesomeIcon icon={faArrowLeft} /> 
                            <span className='new-project-btn-text'>{returnFunctionText}</span>
                        </ButtonComponent>
                    ) : null}
                    <ButtonComponent
                        type='primary'
                        className={`${returnFunction ? 'col-md-3' : 'col-md-4'} project-action-btn`}
                        onClick={handleSaveProject}>
                        <FontAwesomeIcon icon={faSave} /> 
                        <span className='new-project-btn-text'>Save project</span>
                    </ButtonComponent>
                    <ButtonComponent
                        type='warning'
                        className={`${returnFunction ? 'col-md-3' : 'col-md-4'} project-action-btn`}
                        onClick={generateProject}>
                        <FontAwesomeIcon icon={faDownload} />
                        <span className='new-project-btn-text'>Generate project</span>
                    </ButtonComponent>
                    <ButtonComponent
                        type='success'
                        className={`${returnFunction ? 'col-md-3' : 'col-md-4'} project-action-btn`}
                        onClick={handleDeployProject}>
                        <FontAwesomeIcon icon={faArrowAltCircleUp} />
                        <span className='new-project-btn-text'>Deploy project</span>
                    </ButtonComponent>
                </div>
            </div>
        </div>
    );
}

ProjectActionButtonsComponent.propTypes = {
    returnFunction: PropTypes.func,
    returnFunctionText: PropTypes.string,
    handleSaveProject: PropTypes.func.isRequired,
    generateProject: PropTypes.func.isRequired,
    handleDeployProject: PropTypes.func.isRequired
};
 
export default ProjectActionButtonsComponent;