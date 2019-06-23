import React from 'react';
import PropTypes from 'prop-types';

const DroppedComponent = ({droppedComponent}) => {
    return (
        <div>{droppedComponent.name}</div>
    );
};

DroppedComponent.propTypes = {
    droppedComponent: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired
};
 
export default DroppedComponent;