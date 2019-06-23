import React from 'react';
import { Droppable } from 'react-drag-and-drop';
import './ProjectPageComponent.css';
import PropTypes from 'prop-types';

const ProjectPageComponent = ({droppedComponents, handleDropComponent}) => {
    return (
        <div className="project-page-container">
            <Droppable
                    types={['component']} // <= allowed drop types
                    onDrop={handleDropComponent}>
                    <ul className="Smoothie">
                        {droppedComponents.map(component => (<li>{component.name}</li>))}
                    </ul>
            </Droppable>
        </div>
    );
};

ProjectPageComponent.propTypes = {
    droppedComponents: PropTypes.array.isRequired,
    handleDropComponent: PropTypes.func.isRequired
};
 
export default ProjectPageComponent;