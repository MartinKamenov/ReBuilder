import React from 'react';
import PropTypes from 'prop-types';
import DraggableComponent from './DraggableComponent';
import './ProjectComponentsList.css';

const ProjectComponentsList = ({draggableComponents}) => {
    return (
        <ul className='component-list-container vertical-scrollable-container'>
            {
                draggableComponents.map((component, i) => 
                    <DraggableComponent key={i} draggableComponent={component}/>
                )
            }
            <button className='btn btn-primary rearange-btn'>Rearange</button>
        </ul>
    );
}

ProjectComponentsList.propTypes = {
    draggableComponents: PropTypes.array.isRequired
};
 
export default ProjectComponentsList;