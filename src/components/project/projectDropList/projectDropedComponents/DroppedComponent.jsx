import React from 'react';
import PropTypes from 'prop-types';
import './DroppedComponent.css';

const DroppedComponent = ({droppedComponent, handleChangeTextDroppedComponent}) => {
    if(droppedComponent.isInEditMode) {
        return (
            <input 
                className='droped-component'
                value={droppedComponent.innerText}
                onChange={handleChangeTextDroppedComponent}>
            </input>
        );
    }
    return (
        <div className='droped-component'>{droppedComponent.name}</div>
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