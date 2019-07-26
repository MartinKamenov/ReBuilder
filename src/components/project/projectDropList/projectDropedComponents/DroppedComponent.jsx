import React from 'react';
import PropTypes from 'prop-types';
import './DroppedComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUndo } from '@fortawesome/free-solid-svg-icons';
import { componentTypes } from '../../components/componentTypes';
import ButtonComponent from '../../../common/ButtonComponent';
import { Draggable } from 'react-drag-and-drop';
import { Resizable } from 're-resizable';
import { Droppable } from 'react-drag-and-drop';

const initialSizes = {
    width: '0px',
    height: '0px'
};

const getComponent = (droppedComponent, handleChangeEditMode, handleDropContainerComponent) => {
    let component = null;
    switch (droppedComponent.name) {
        case componentTypes.Header:
            component = (
                <h1
                    id={droppedComponent.index}
                    style={droppedComponent.style}
                    onClick={() => handleChangeEditMode(droppedComponent.index)}
                    className='droped-component'>
                    {droppedComponent.innerText}
                </h1>)
            break;
        case componentTypes.Text:
            component = (
                <div
                    id={droppedComponent.index}
                    style={droppedComponent.style}
                    onClick={() => handleChangeEditMode(droppedComponent.index)}
                    className='droped-component'>
                    {droppedComponent.innerText}
                </div>);
            break;
        case componentTypes.Image:
            component = (
                <img
                    draggable={false}
                    id={droppedComponent.index}
                    alt='component'
                    src={droppedComponent.src}
                    style={droppedComponent.style}
                    onClick={() => handleChangeEditMode(droppedComponent.index)}
                    className='droped-component'/>);
            break;
        case componentTypes.RoutingLink:
            component = (
                <a
                    id={droppedComponent.index}
                    href={droppedComponent.to}
                    alt='component'
                    style={droppedComponent.style}
                    onClick={(e) => {
                        e.preventDefault(); 
                        handleChangeEditMode(droppedComponent.index)}}
                    className='droped-component'>
                    {droppedComponent.innerText}
                </a>);
            break;
        case componentTypes.Container:
            component = (
                <Droppable
                    style={droppedComponent.style}
                    types={['component']} // <= allowed drop types
                    onDrop={handleDropContainerComponent}>
                    <div
                        id={droppedComponent.index}
                        style={droppedComponent.style}
                        onClick={() => handleChangeEditMode(droppedComponent.index)}
                        className='droped-component'>
                        {droppedComponent.innerText}
                    </div>
                </Droppable>)
            break;
        default:
            component = (
            <div
                id={droppedComponent.index}
                style={droppedComponent.style}
                onClick={() => handleChangeEditMode(droppedComponent.index)}
                className='droped-component'>
                {droppedComponent.innerText}
            </div>);
            break;
    }

    return component;
};

const DroppedComponent = ({
        droppedComponent,
        handleComponentValueChange,
        handleChangeEditMode,
        handleForceExitEditMode,
        componentDragStart,
        rearangeComponents,
        componentDragEnd,
        handleDropContainerComponent
    }) => {
    if(droppedComponent.isInEditMode) {
        return (
            <div className='edit-component-container'>
                <Resizable
                    style={{margin: 'auto'}}
                    onResizeStart={(event, direction, refToElement, delta) => {
                        initialSizes.width = parseInt(droppedComponent.style.width, 10);
                        initialSizes.height = parseInt(droppedComponent.style.height, 10);
                    }}
                    onResize={(event, direction, refToElement, delta) => {
                        const { width, height } = delta;
                        const newWidth = initialSizes.width + width;
                        const newHeight = initialSizes.height + height;
                        handleComponentValueChange(newWidth + 'px', 'style.width');
                        handleComponentValueChange(newHeight + 'px', 'style.height');
                    }}
                    size={{
                        width: droppedComponent.style.width,
                        height: droppedComponent.style.height 
                    }}>
                {
                    (() => {
                        let element;
                        switch(droppedComponent.name) {
                            case componentTypes.Image:
                                element = (
                                    <img
                                        alt='component'
                                        src={droppedComponent.src}
                                        style={droppedComponent.style}
                                        className='edit-input'/>
                                );
                                break;
                            default:
                                const copyOfStyles = Object.assign({}, droppedComponent.style);
                                copyOfStyles.resize = 'none';
                                element = (
                                        <textarea
                                            style={copyOfStyles}
                                            className='edit-input'
                                            value={droppedComponent.innerText}
                                            onChange={(event) => 
                                                handleComponentValueChange(event.target.value, 'innerText')}>
                                        </textarea>
                                );
                                break;
                        }
                        return element;
                    })()
                }
                </Resizable>
                
                <ButtonComponent
                    type='success'
                    onClick={() => handleChangeEditMode(droppedComponent.index)}>
                    <FontAwesomeIcon icon={faCheck} />
                    Accept
                </ButtonComponent>
                <ButtonComponent
                    type='warning'
                    onClick={() => handleForceExitEditMode(droppedComponent.index)}>
                    <FontAwesomeIcon icon={faUndo} />
                    Undo
                </ButtonComponent>
            </div>
        );
    }
    const component = getComponent(
        droppedComponent,
        handleChangeEditMode,
        handleDropContainerComponent
    );
    return (
        <Draggable 
            onDragStart={() => componentDragStart(droppedComponent.index)}
            onDragOver={rearangeComponents}
            onDragEnd={componentDragEnd}>
            {component}
        </Draggable>
    );
};

DroppedComponent.propTypes = {
    droppedComponent: PropTypes.shape({
        name: PropTypes.string.isRequired,
        innerText: PropTypes.string.isRequired,
        isInEditMode: PropTypes.bool.isRequired,
        index: PropTypes.string.isRequired
    }).isRequired,
    handleComponentValueChange: PropTypes.func.isRequired,
    handleForceExitEditMode: PropTypes.func.isRequired
};
 
export default DroppedComponent;