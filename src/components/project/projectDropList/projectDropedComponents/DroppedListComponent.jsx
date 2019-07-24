import React from 'react';
import PropTypes from 'prop-types';
import './DroppedListComponent.css';
import DroppedComponent from './DroppedComponent';

const DroppedListComponent = ({
        droppedComponents,
        handleComponentValueChange,
        handleChangeEditMode,
        handleForceExitEditMode,
        componentDragStart,
        rearangeComponents
    }) => {
    return (
        <div className='droped-components-container vertical-scrollable-container'>
            {
                droppedComponents.map((component, i) => (
                    <DroppedComponent
                        key={i}
                        droppedComponent={component}
                        handleComponentValueChange={handleComponentValueChange}
                        handleChangeEditMode={handleChangeEditMode}
                        handleForceExitEditMode={handleForceExitEditMode}
                        componentDragStart={componentDragStart}
                        rearangeComponents={rearangeComponents}/>
                ))
            }
        </div>
    );
};

DroppedListComponent.propTypes = {
    droppedComponents: PropTypes.array.isRequired,
    handleComponentValueChange: PropTypes.func.isRequired,
    handleChangeEditMode: PropTypes.func.isRequired,
    handleForceExitEditMode: PropTypes.func.isRequired
};
 
export default DroppedListComponent;