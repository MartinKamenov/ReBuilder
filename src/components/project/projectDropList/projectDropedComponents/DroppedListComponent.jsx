import React from 'react';
import PropTypes from 'prop-types';
import './DroppedListComponent.css';
import DroppedComponent from './DroppedComponent';

const DroppedListComponent = ({
        droppedComponents,
        handleChangeTextDroppedComponent,
        handleChangeEditMode,
        handleForceExitEditMode
    }) => {
    return (
        <div className='droped-components-container'>
            {
                droppedComponents.map((component, i) => (
                    <DroppedComponent
                        key={i}
                        droppedComponent={component}
                        handleChangeTextDroppedComponent={handleChangeTextDroppedComponent}
                        handleChangeEditMode={handleChangeEditMode}
                        handleForceExitEditMode={handleForceExitEditMode} />
                ))
            }
        </div>
    );
};

DroppedListComponent.propTypes = {
    droppedComponents: PropTypes.array.isRequired,
    handleChangeTextDroppedComponent: PropTypes.func.isRequired,
    handleChangeEditMode: PropTypes.func.isRequired,
    handleForceExitEditMode: PropTypes.func.isRequired
};
 
export default DroppedListComponent;