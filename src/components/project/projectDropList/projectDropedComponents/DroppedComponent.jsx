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

const getComponent = (
        droppedComponent,
        handleChangeEditMode,
        handleDropContainerComponent,
        elementStyle
    ) => {
    debugger;
    let component = null;
    switch (droppedComponent.name) {
        case componentTypes.Header:
            component = (
                <h1
                    key={droppedComponent.index}
                    id={droppedComponent.index}
                    style={elementStyle}
                    onClick={(event) => {
                        event.stopPropagation();
                        handleChangeEditMode(droppedComponent.index)
                    }}
                    className='droped-component'>
                    {droppedComponent.innerText}
                </h1>)
            break;
        case componentTypes.Text:
            component = (
                <div
                    key={droppedComponent.index}
                    id={droppedComponent.index}
                    style={elementStyle}
                    onClick={(event) => {
                        event.stopPropagation();
                        handleChangeEditMode(droppedComponent.index);
                    }}
                    className='droped-component'>
                    {droppedComponent.innerText}
                </div>);
            break;
        case componentTypes.Image:
            component = (
                <img
                    key={droppedComponent.index}
                    draggable={false}
                    id={droppedComponent.index}
                    alt='component'
                    src={droppedComponent.src}
                    style={elementStyle}
                    onClick={(event) => {
                        event.stopPropagation();
                        handleChangeEditMode(droppedComponent.index);
                    }}
                    className='droped-component'/>);
            break;
        case componentTypes.RoutingLink:
            component = (
                <a
                    key={droppedComponent.index}
                    id={droppedComponent.index}
                    href={droppedComponent.to}
                    alt='component'
                    style={elementStyle}
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
                    key={droppedComponent.index}
                    types={['component']} // <= allowed drop types
                    onDrop={(event, nativeEvent) => 
                        handleDropContainerComponent(event, nativeEvent, droppedComponent.index)}>
                    <div
                        id={droppedComponent.index}
                        style={elementStyle}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleChangeEditMode(droppedComponent.index);
                        }}
                        className='droped-component'>
                        {
                            droppedComponent.children.map((c) => {
                                debugger;
                                return (
                                getComponent(c, handleChangeEditMode, handleDropContainerComponent, c.style)
                            )})
                        }
                    </div>
                </Droppable>)
            break;
        case componentTypes.NavigationBar:
        component = (
                <Droppable
                    key={droppedComponent.index}
                    types={['component']} // <= allowed drop types
                    onDrop={(event, nativeEvent) => 
                        handleDropContainerComponent(event, nativeEvent, droppedComponent.index)}>
                    <div
                        id={droppedComponent.index}
                        style={elementStyle}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleChangeEditMode(droppedComponent.index);
                        }}
                        className='droped-component'>
                        {
                            droppedComponent.children.map((c) => (
                                getComponent(c,
                                    handleChangeEditMode,
                                    handleDropContainerComponent,
                                    c.style
                                )
                            ))
                        }
                    </div>
                </Droppable>);
            break;
        default:
            component = (
            <div
                key={droppedComponent.index}
                id={droppedComponent.index}
                style={elementStyle}
                onClick={(event) => {
                    event.stopPropagation();
                    handleChangeEditMode(droppedComponent.index)
                }}
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
        const copyOfStyle = Object.assign({}, droppedComponent.style);
        const editModeContainer = {
            width: `calc(${copyOfStyle.width} - 3px)`,
            height: `calc(${copyOfStyle.height} - 3px)`,
            marginLeft: copyOfStyle.marginLeft,
            marginRight: copyOfStyle.marginRight,
            display: copyOfStyle.display,
            zIndex: 1
        };
        const resizableStyle = {
            width: '100%',
        };

        copyOfStyle.display = 'block';
        copyOfStyle.width = '100%';

        return (
            <div
                className='blinkdiv'
                style={editModeContainer}>
                <Resizable
                    style={resizableStyle}
                    onResizeStart={(event, direction, refToElement, delta) => {
                        initialSizes.width = parseInt(droppedComponent.style.width, 10);
                        initialSizes.height = parseInt(droppedComponent.style.height, 10);
                    }}
                    onResize={(event, direction, refToElement, delta) => {
                        const { width, height } = delta;
                        if(width !== 0) {
                            const newWidth = initialSizes.width + width;
                            handleComponentValueChange(newWidth + 'px', 'style.width');
                        }
                        if(height !== 0) {
                            const newHeight = initialSizes.height + height;
                            handleComponentValueChange(newHeight + 'px', 'style.height');
                        }
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
                                        style={copyOfStyle}
                                        className='edit-input'/>
                                );
                                break;
                            case componentTypes.Container:
                            case componentTypes.NavigationBar:
                                element = (
                                    <div
                                        alt='component'
                                        src={droppedComponent.src}
                                        style={copyOfStyle}
                                        className='edit-input'>
                                        {
                                            droppedComponent.children.map((c) => (
                                                getComponent(
                                                    c,
                                                    handleChangeEditMode,
                                                    handleDropContainerComponent,
                                                    c.style
                                                )
                                            ))
                                        }
                                        </div>
                                );
                                break;
                            default:
                                copyOfStyle.resize = 'none';
                                element = (
                                        <textarea
                                            style={copyOfStyle}
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

                <div className='center-container small-buttons-action-container'>
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
            </div>
        );
    }

    const draggableStyle = {
        display: droppedComponent.style.display,
        width: droppedComponent.style.width,
        marginTop: droppedComponent.style.marginTop,
        marginBottom: droppedComponent.style.marginBottom,
        marginLeft: droppedComponent.style.marginLeft,
        marginRight: droppedComponent.style.marginRight
    };
    const elementStyle = Object.assign({}, droppedComponent.style);
    Object.keys(draggableStyle).forEach(k => {
        delete elementStyle[k];
    });
    elementStyle.width = '100%';
    elementStyle.display = 'inline-block';
    const component = getComponent(
        droppedComponent,
        handleChangeEditMode,
        handleDropContainerComponent,
        elementStyle
    );
    
    return (
        <Draggable 
            style={draggableStyle}
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
        innerText: PropTypes.string,
        isInEditMode: PropTypes.bool.isRequired,
        index: PropTypes.string.isRequired
    }).isRequired,
    handleComponentValueChange: PropTypes.func.isRequired,
    handleForceExitEditMode: PropTypes.func.isRequired
};
 
export default DroppedComponent;