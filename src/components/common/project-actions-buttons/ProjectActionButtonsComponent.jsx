import React from 'react';

import ButtonComponent from '../button/ButtonComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import './ProjectActionButtonsComponent.css';

const ProjectActionButtonsComponent = ({
    returnFunction,
    returnFunctionText,
    handleSaveProject,
    generateProject
}) => {
    return (
        <div className='new-project-name-outer-container'>
            <ButtonComponent
                type='theme'
                className='col-md-4 col-sm-4 col-xs-12 project-action-btn'
                onClick={returnFunction}>
                <FontAwesomeIcon icon={faArrowLeft} /> 
                <span className='new-project-btn-text'>{returnFunctionText}</span>
            </ButtonComponent>
            <ButtonComponent
                type='theme'
                className='col-md-4 col-sm-4 col-xs-12 project-action-btn'
                onClick={handleSaveProject}>
                <FontAwesomeIcon icon={faSave} /> 
                <span className='new-project-btn-text'>Save project</span>
            </ButtonComponent>
            <ButtonComponent
                type='theme'
                className='col-md-4 col-sm-4 col-xs-12 project-action-btn'
                onClick={generateProject}>
                <FontAwesomeIcon icon={faDownload} />
                <span className='new-project-btn-text'>Generate project</span>
            </ButtonComponent>
        </div>
    );
};

ProjectActionButtonsComponent.propTypes = {
    returnFunction: PropTypes.func,
    returnFunctionText: PropTypes.string,
    handleSaveProject: PropTypes.func.isRequired,
    generateProject: PropTypes.func.isRequired
};
 
export default ProjectActionButtonsComponent;