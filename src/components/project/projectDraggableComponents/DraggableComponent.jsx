import React from 'react';
import { Draggable } from 'react-drag-and-drop';
import PropTypes from 'prop-types';
import './DraggableComponent.css';

const DraggableComponent = ({draggableComponent}) => {
    return (
        <Draggable type="component" data={draggableComponent.name}>
            <div className='draggable-element'>{draggableComponent.name}</div>
        </Draggable>
    );
};

DraggableComponent.propTypes = {
    draggableComponent: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired
};
 
export default DraggableComponent;