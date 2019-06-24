import React from 'react';
import PropTypes from 'prop-types';
import './DroppedComponent.css';

const DroppedComponent = ({droppedComponent}) => {
    return (
        <div className='droped-component'>{droppedComponent.name}</div>
    );
};

DroppedComponent.propTypes = {
    droppedComponent: PropTypes.shape({
        name: PropTypes.string.isRequired,
        innerText: PropTypes.string.isRequired
    }).isRequired
};
 
export default DroppedComponent;