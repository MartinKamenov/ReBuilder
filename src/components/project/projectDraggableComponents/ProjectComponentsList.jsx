import React from 'react';
import PropTypes from 'prop-types';
import DraggableComponent from './DraggableComponent';
import './ProjectComponentsList.css';

const ProjectComponentsList = ({ draggableComponents, active }) => {
    return (
        <div 
            className='component-list-container'>
            {
                draggableComponents.map((component, i) => 
                    <DraggableComponent key={i} draggableComponent={component}/>
                )
            }
        </div>
    );
};

ProjectComponentsList.propTypes = {
    draggableComponents: PropTypes.array.isRequired
};
 
export default ProjectComponentsList;