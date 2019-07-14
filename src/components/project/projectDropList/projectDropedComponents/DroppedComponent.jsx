import React from 'react';
import PropTypes from 'prop-types';
import './DroppedComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUndo } from '@fortawesome/free-solid-svg-icons';

const DroppedComponent = ({
        droppedComponent,
        handleComponentValueChange,
        handleChangeEditMode,
        handleForceExitEditMode
    }) => {
    if(droppedComponent.isInEditMode) {
        return (
            <div className='edit-component-container'>
                {
                    (() => {
                        let element;
                        switch(droppedComponent.name) {
                            case 'Image':
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
                
                <button
                    className='btn btn-success'
                    onClick={() => handleChangeEditMode(droppedComponent.index)}>
                    <FontAwesomeIcon icon={faCheck} /> 
                </button>
                <button
                    className='btn btn-warning'
                    onClick={() => handleForceExitEditMode(droppedComponent.index)}>
                    <FontAwesomeIcon icon={faUndo} /> 
                </button>
            </div>
        );
    }
    return (
        <div>
        {
            (() => {
                let component = null;
                switch (droppedComponent.name) {
                    case 'Header':
                        component = (
                        <h1
                            style={droppedComponent.style}
                            onClick={() => handleChangeEditMode(droppedComponent.index)}
                            className='droped-component'>
                            {droppedComponent.innerText}
                        </h1>)
                        break;
                    case 'Text':
                        component = (
                        <div
                            style={droppedComponent.style}
                            onClick={() => handleChangeEditMode(droppedComponent.index)}
                            className='droped-component'>
                            {droppedComponent.innerText}
                        </div>);
                        break;
                    case 'Image':
                        component = (
                            <img
                                alt='component'
                                src={droppedComponent.src}
                                style={droppedComponent.style}
                                onClick={() => handleChangeEditMode(droppedComponent.index)}
                                className='droped-component'/>);
                        break;
                    default:
                        component = (
                        <div
                            style={droppedComponent.style}
                            onClick={() => handleChangeEditMode(droppedComponent.index)}
                            className='droped-component'>
                            {droppedComponent.innerText}
                        </div>);
                        break;
                }

                return component;
            })()
        }
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
    handleComponentValueChange: PropTypes.func.isRequired,
    handleForceExitEditMode: PropTypes.func.isRequired
};
 
export default DroppedComponent;