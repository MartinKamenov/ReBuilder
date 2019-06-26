import React from 'react';
import PropTypes from 'prop-types';
import DraggableComponent from './DraggableComponent';

const ProjectComponentsList = ({draggableComponents}) => {
    return (
        <ul className='component-list-container'>
            {
                draggableComponents.map((component, i) => 
                    <DraggableComponent key={i} draggableComponent={component}/>
                )
            }
        </ul>
    );
}

ProjectComponentsList.propTypes = {
    draggableComponents: PropTypes.array.isRequired
};
 
export default ProjectComponentsList;