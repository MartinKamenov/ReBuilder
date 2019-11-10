import React, { useEffect, useCallback, useState, useRef } from 'react';
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faCheck, faTrashAlt, faUndo } from '@fortawesome/free-solid-svg-icons';
import './ElementToolbarComponent.css';
import ButtonComponent from '../../common/button/ButtonComponent';

const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

let left = 40;
let top = 50;

let currentTop = 0;
let currentLeft = 0;

const ElementToolbarComponent = ({
    component,
    handleComponentValueChange,
    handleComponentImageChange,
    actions
}) => {
    const inputEl = useRef(null);
    
    const [dragHasStarted, setDragHasStarted] = useState(false);

    const handleButtonPress = (ev) => {
        currentLeft = ev.clientX;
        currentTop = ev.clientY;
        setDragHasStarted(true);
    };

    const handleButtonRelease = () => {
        setDragHasStarted(false);
    };

    const handleButtonMove = (ev) => {
        if(!dragHasStarted) {
            return;
        }
        const diffX = ev.clientX - currentLeft;
        const diffY = ev.clientY - currentTop;
        currentLeft = ev.clientX;
        currentTop = ev.clientY;
        if(diffX) {
            const leftNum = left + diffX;
            inputEl.current.style.left = leftNum + 'px';
            left = leftNum;
        }

        if(diffY) {
            const topNum = top + diffY;
            inputEl.current.style.top = topNum + 'px';
            top = topNum;
        }
    };

    const handleEnterPressed = useCallback(({ key }) => {
        switch(key) {
        case 'Enter':
            actions.handleChangeEditMode(component.index);
            break;
        case 'Escape':
            actions.handleForceExitEditMode(component.index);
            break;
        default:
            break;
        }
    }, [actions, component]);

    const hasToolbarParent = useCallback((element) => {
        if(!element.parentElement) {
            return false;
        } else if(element.className === 'toolbar-container') {
            return true;
        }

        return hasToolbarParent(element.parentElement);
    }, []);

    const handleClick = useCallback(({ target }) => {
        if(!hasToolbarParent(target)) {
            actions.handleChangeEditMode(component.index);
        }
    }, [component, hasToolbarParent, actions]);

    useEffect(() => {
        if(component) {
            document.addEventListener('click', handleClick);
            document.addEventListener('keydown', handleEnterPressed);
        } else {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleEnterPressed);
        }

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleEnterPressed);
        };
    }, [component, handleClick, handleEnterPressed]);

    if(!component) {
        return (
            <div className='toolbar-container-inactive'>
                <h3>Toolbar</h3>
                <div>Select an element by clicking on it</div>
            </div>
        );
    }

    const inputs = Object.keys(component).filter((c) =>
        (c !== 'title' && c !== 'style' && c !== 'isInEditMode' &&
            c !== 'index' && c !== 'src' && c !== 'name' && c !== 'description' &&
            !Array.isArray(component[c + 'Values'])) && !Array.isArray(component[c]));
    const dropdowns = Object.keys(component).filter((c) => (
        Array.isArray(component[c + 'Values'])
    ));

    const styles = Object.keys(component.style)
        .filter((c) => (c !== 'color' && c !== 'backgroundColor' && 
            !Array.isArray(component.style[c + 'Values'])) &&
            !Array.isArray(component.style[c]));
    
    const styleDropdowns = Object.keys(component.style).filter((c) => (
        Array.isArray(component.style[c + 'Values'])
    ));

    return (
        <div
            onTouchStart={handleButtonPress} 
            onTouchEnd={handleButtonRelease}
            onTouchMove={handleButtonMove} 
            onMouseDown={handleButtonPress}
            onMouseUp={handleButtonRelease} 
            onMouseLeave={handleButtonRelease}
            onMouseMove={handleButtonMove}
            ref={inputEl}
            className='toolbar-container'>
            <div className='toolbar-toolbar'>
                <div
                    className='close-toolbar-button'
                    onClick={() => actions.handleChangeEditMode(component.index)}>
                    <FontAwesomeIcon
                        color='#ff0000'
                        size='lg'
                        icon={faWindowClose} />
                </div>
            </div>
            <div className='vertical-scrollable-container toolbar-scrollable'>
                <div className='toolbar-element-container'>
                    <h3 className='component-type-header'>{component.name}</h3>
                    <h3>Properties</h3>
                    { component.src ? (
                        <div
                            className='component-input-changer-container'>
                            <label className='component-changer-label'>
                                Src
                            </label>
                            <input
                                id='change-element-image'
                                type='file'
                                className='change-element-image'
                                onChange={handleComponentImageChange}>
                            </input>
                            <ButtonComponent
                                onClick={(event) => {
                                    const element = document.getElementById('change-element-image');
                                    element.click(event);
                                }
                                }
                                type='success'
                                title='Upload image'/>
                        </div>
                    ) : (
                        <div></div>
                    ) }
                    {
                        dropdowns.map((dropdown, k) => {
                            const values = component[dropdown + 'Values'];
                            return (
                                <div
                                    key={k}
                                    className='component-input-changer-container'>
                                    <label className='component-changer-label'>
                                        {capitalizeFirstLetter(dropdown)}
                                    </label>
                                    <select
                                        onChange={(event) => 
                                            handleComponentValueChange(event.target.value, dropdown)
                                        }
                                        className='component-changer-input'
                                        name={dropdown}
                                        value={component[dropdown]}>
                                        {values.map((value, i) => (
                                            <option
                                                key={i}
                                                value={value}>{value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        })
                    }
                    {
                        inputs.map((input, i) => {
                            return (
                                <div
                                    className='component-input-changer-container'
                                    key={i}>
                                    <label className='component-changer-label'>
                                        {capitalizeFirstLetter(input)}
                                    </label>
                                    <input
                                        className='component-changer-input'
                                        onChange={(event) => handleComponentValueChange(event.target.value, input)}
                                        value={component[input]}
                                        placeholder={input}>
                                    </input>
                                </div>
                            );
                        })
                    }
                    <h3>Styles</h3>
                    {
                        styleDropdowns.map((dropdown, k) => {
                            const values = component.style[dropdown + 'Values'];
                            return (
                                <div
                                    key={k}
                                    className='component-input-changer-container'>
                                    <label className='component-changer-label'>
                                        {capitalizeFirstLetter(dropdown)}
                                    </label>
                                    <select
                                        onChange={(event) => 
                                            handleComponentValueChange(event.target.value, 'style.' + dropdown)
                                        }
                                        className='component-changer-input'
                                        name={'style.' + dropdown}
                                        value={component.style[dropdown]}>
                                        {values.map((value, i) => (
                                            <option
                                                key={i}
                                                value={value}>{value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        })
                    }
                    {
                        styles.map((style, i) => {
                            return (
                                <div
                                    key={i}
                                    className='component-input-changer-container'>
                                    <label className='component-changer-label'>
                                        {capitalizeFirstLetter(style)}
                                    </label>
                                    <input
                                        className='component-changer-input'
                                        onChange={(event) => handleComponentValueChange(event.target.value, 'style.' + style)}
                                        value={component.style[style]}
                                        placeholder={style}>
                                    </input>
                                </div>
                            );
                        })
                    }
                </div>
                <h3>Colors</h3>
                <div className='toolbar-element-container'>
                    <label>Font color</label>
                    <ChromePicker
                        color={{ hex: component.style.color }}
                        onChangeComplete={(event) => handleComponentValueChange(event, 'color')}
                        style={{width: '100px', margin: 'auto'}} />
                </div>
                <div className='toolbar-element-container'>
                    <label>Background color</label>
                    <ChromePicker
                        color={{ hex: component.style.backgroundColor }}
                        onChangeComplete={(event) => handleComponentValueChange(event, 'backgroundColor')}
                        style={{width: '100px'}} />
                </div>
            </div>
            <div className='actions-container'>
                <ButtonComponent
                    type='success'
                    onClick={() => actions.handleChangeEditMode(component.index)}
                    className='actions-button'>
                    <FontAwesomeIcon className='action-icon' icon={faCheck} />
                    Accept changes
                </ButtonComponent>
                <ButtonComponent
                    type='warning'
                    onClick={() => actions.handleForceExitEditMode(component.index)}
                    className='actions-button'>
                    <FontAwesomeIcon className='action-icon' icon={faUndo} />
                    Revert changes
                </ButtonComponent>
                <ButtonComponent
                    type='danger'
                    onClick={() => actions.handleDeleteComponent(component.index)}
                    className='actions-button'>
                    <FontAwesomeIcon className='action-icon' icon={faTrashAlt} />
                    Delete
                </ButtonComponent>
            </div>
        </div>
    );
};

ElementToolbarComponent.propTypes = {
    component: PropTypes.shape({
        name: PropTypes.string.isRequired,
        innerText: PropTypes.string,
        index: PropTypes.string.isRequired
    }),
    actions: PropTypes.shape({
        handleChangeEditMode: PropTypes.func.isRequired,
        handleForceExitEditMode: PropTypes.func.isRequired,
        handleDeleteComponent: PropTypes.func.isRequired
    }).isRequired,
    handleComponentValueChange: PropTypes.func.isRequired,
    handleComponentImageChange: PropTypes.func.isRequired
};
 
export default ElementToolbarComponent;