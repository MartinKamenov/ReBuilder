import React from 'react';
import PropTypes from 'prop-types';
import DraggableComponent from './DraggableComponent';
import './ProjectComponentsList.css';

const ProjectComponentsList = ({draggableComponents}) => {
    return (
        <div className='component-list-container vertical-scrollable-container'>
            <h3>Draggable element</h3>
                {
                    draggableComponents.map((component, i) => 
                        <DraggableComponent key={i} draggableComponent={component}/>
                    )
                }
            <button className='btn btn-primary rearange-btn'>Rearange</button>
        </div>
    );
}

ProjectComponentsList.propTypes = {
    draggableComponents: PropTypes.array.isRequired
};
 
export default ProjectComponentsList;