import React from 'react';
import PropTypes from 'prop-types';
import DraggableComponent from './DraggableComponent';
import './ProjectComponentsList.css';
import ButtonComponent from '../../common/ButtonComponent';

const ProjectComponentsList = ({ draggableComponents }) => {
    return (
        <div className='component-list-container vertical-scrollable-container'>
            <h3>Draggable element</h3>
                {
                    draggableComponents.map((component, i) => 
                        <DraggableComponent key={i} draggableComponent={component}/>
                    )
                }
            <ButtonComponent
                title='Rearange'
                type='primary'
                className='rearange-btn'>
            </ButtonComponent>
        </div>
    );
}

ProjectComponentsList.propTypes = {
    draggableComponents: PropTypes.array.isRequired
};
 
export default ProjectComponentsList;