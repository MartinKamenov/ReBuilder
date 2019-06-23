import React from 'react';
import { Droppable } from 'react-drag-and-drop';
import './ProjectPageComponent.css';
import PropTypes from 'prop-types';
import DroppedListComponent from './projectDropedComponents/DroppedListComponent';

const ProjectPageComponent = ({droppedComponents, handleDropComponent}) => {
    return (
        <div className="project-page-container">
            <Droppable
                    types={['component']} // <= allowed drop types
                    onDrop={handleDropComponent}>
                    <DroppedListComponent droppedComponents={droppedComponents}/>
            </Droppable>
        </div>
    );
};

ProjectPageComponent.propTypes = {
    droppedComponents: PropTypes.array.isRequired,
    handleDropComponent: PropTypes.func.isRequired
};
 
export default ProjectPageComponent;