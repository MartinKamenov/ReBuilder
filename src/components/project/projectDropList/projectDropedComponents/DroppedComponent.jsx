import React from 'react';
import PropTypes from 'prop-types';
import './DroppedComponent.css';

const DroppedComponent = ({
        droppedComponent,
        handleChangeTextDroppedComponent,
        handleChangeEditMode
    }) => {
    if(droppedComponent.isInEditMode) {
        return (
            <input 
                className='droped-component'
                value={droppedComponent.innerText}
                onChange={(event) => 
                    handleChangeTextDroppedComponent(event.target.value, droppedComponent.index)}>
            </input>
        );
    }
    return (
        <div 
            onClick={() => handleChangeEditMode(droppedComponent.index)}
            className='droped-component'>
            {droppedComponent.innerText}
        </div>
    );
};

DroppedComponent.propTypes = {
    droppedComponent: PropTypes.shape({
        name: PropTypes.string.isRequired,
        innerText: PropTypes.string.isRequired,
        isInEditMode: PropTypes.bool.isRequired,
        index: PropTypes.number.isRequired
    }).isRequired,
    handleChangeTextDroppedComponent: PropTypes.func.isRequired
};
 
export default DroppedComponent;