import React from 'react';
import PropTypes from 'prop-types';
import DraggableComponent from './DraggableComponent';
import './ProjectComponentsList.css';

const ProjectComponentsList = ({ draggableComponents, handleAddComponent }) => {
    return (
        <div 
            className='component-list-container'>
            {
                draggableComponents.map((component, i) => 
                    <DraggableComponent key={i}
                        draggableComponent={component}
                        handleAddComponent={handleAddComponent}/>
                )
            }
        </div>
    );
};

ProjectComponentsList.propTypes = {
    draggableComponents: PropTypes.array.isRequired,
    handleAddComponent: PropTypes.func.isRequired
};
 
export default ProjectComponentsList;