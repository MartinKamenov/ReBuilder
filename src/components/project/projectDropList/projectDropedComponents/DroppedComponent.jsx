import React from 'react';
import PropTypes from 'prop-types';
import './DroppedComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const DroppedComponent = ({
        droppedComponent,
        handleChangeTextDroppedComponent,
        handleChangeEditMode
    }) => {
    if(droppedComponent.isInEditMode) {
        return (
            <div className='edit-component-container'>
                <input
                    className='edit-input'
                    value={droppedComponent.innerText}
                    onChange={(event) => 
                        handleChangeTextDroppedComponent(event.target.value, droppedComponent.index)}>
                </input>
                <button onClick={() => handleChangeEditMode(droppedComponent.index)}>
                    <FontAwesomeIcon icon={faCheck} /> 
                </button>
            </div>
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