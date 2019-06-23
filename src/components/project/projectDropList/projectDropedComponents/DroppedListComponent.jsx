import React from 'react';
import PropTypes from 'prop-types';
import './DroppedListComponent.css';
import DroppedComponent from './DroppedComponent';

const DroppedListComponent = ({droppedComponents}) => {
    return (
        <div className='droped-components-container'>
            {
                droppedComponents.map((component, i) => (
                    <DroppedComponent
                        key={i}
                        droppedComponent={component} />
                ))
            }
        </div>
    );
};

DroppedListComponent.propTypes = {
    droppedComponents: PropTypes.array.isRequired
};
 
export default DroppedListComponent;