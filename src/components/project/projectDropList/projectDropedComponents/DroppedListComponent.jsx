import React from 'react';
import PropTypes from 'prop-types';
import './DroppedListComponent.css';
import DroppedComponent from './DroppedComponent';
import { componentTypes } from '../../components/componentTypes';

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
    const bodyElement = droppedComponents.find((c) => c.name === componentTypes.Body);
    return (
        <div
            id='body-component'
            style={bodyElement.style}
            className='droped-components-container vertical-scrollable-container'
            onClick={(ev) => {
                if(!ev.target.id === 'body-component' || bodyElement.isInEditMode) {
                    return;
                }

                handleChangeEditMode('body');
            }}
            >
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