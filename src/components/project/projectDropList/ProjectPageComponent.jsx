import React from 'react';
import { Droppable } from 'react-drag-and-drop';
import './ProjectPageComponent.css';
import PropTypes from 'prop-types';
import DroppedListComponent from './projectDropedComponents/DroppedListComponent';

const ProjectPageComponent = ({
        droppedComponents,
        handleDropComponent,
        handleComponentValueChange,
        handleChangeEditMode,
        handleForceExitEditMode
    }) => {
    return (
        <div className="project-page-container">
            <Droppable
                    className='droppable-container'
                    types={['component']} // <= allowed drop types
                    onDrop={handleDropComponent}>
                    <DroppedListComponent
                        handleComponentValueChange={handleComponentValueChange}
                        handleChangeEditMode={handleChangeEditMode}
                        handleForceExitEditMode={handleForceExitEditMode}
                        droppedComponents={droppedComponents}/>
            </Droppable>
        </div>
    );
};

ProjectPageComponent.propTypes = {
    droppedComponents: PropTypes.array.isRequired,
    handleDropComponent: PropTypes.func.isRequired,
    handleComponentValueChange: PropTypes.func.isRequired,
    handleChangeEditMode: PropTypes.func.isRequired,
    handleForceExitEditMode: PropTypes.func.isRequired
};
 
export default ProjectPageComponent;