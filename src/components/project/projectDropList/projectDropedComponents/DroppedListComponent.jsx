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
    componentDragEnd,
    rearangeComponents,
    handleDropContainerComponent
}) => {
    return (
        <div
            className='droped-components-container vertical-scrollable-container'
            onClick={() => {
                console.log('Body clicked');
            }}>
            {
                droppedComponents.map((component, i) => (
                    <DroppedComponent
                        key={i}
                        droppedComponent={component}
                        handleComponentValueChange={handleComponentValueChange}
                        handleChangeEditMode={handleChangeEditMode}
                        handleForceExitEditMode={handleForceExitEditMode}
                        componentDragStart={componentDragStart}
                        componentDragEnd={componentDragEnd}
                        rearangeComponents={rearangeComponents}
                        handleDropContainerComponent={handleDropContainerComponent}/>
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