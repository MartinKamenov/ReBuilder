import React from 'react';
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashAlt, faUndo } from '@fortawesome/free-solid-svg-icons';
import './ElementToolbarComponent.css';

const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

const ElementToolbarComponent = ({component, handleComponentValueChange, actions}) => {
    if(!component) {
        return (
            <div className='toolbar-container'>
                <h3>Toolbar</h3>
                <div>Select an element by clicking on it</div>
            </div>
        )
    }

    const inputs = Object.keys(component).filter((c) =>
        (c !== 'style' && c !== 'isInEditMode' &&
            c !== 'index' && c !== 'name' &&
            !Array.isArray(component[c + 'Values'])) && !Array.isArray(component[c]));
    const dropdowns = Object.keys(component).filter((c) => (
        Array.isArray(component[c + 'Values'])
    ));
    const styles = Object.keys(component.style)
        .filter((c) => (c !== 'color' && c !== 'backgroundColor'));

    return (
        <div className='toolbar-container'>
            <div className='vertical-scrollable-container toolbar-scrollable'>
                <div className='toolbar-element-container'>
                    <h3>Properties</h3>
                    {
                        dropdowns.map((dropdown, k) => {
                            const values = component[dropdown + 'Values'];
                            debugger;
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
                            )
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
                            )
                        })
                    }
                    <h3>Styles</h3>
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
                            )
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
                <button
                    onClick={() => actions.handleChangeEditMode(component.index)}
                    className='actions-button btn btn-success'>
                    <FontAwesomeIcon className='action-icon' icon={faCheck} />
                    Accept changes
                </button>
                <button
                    onClick={() => actions.handleForceExitEditMode(component.index)}
                    className='actions-button btn btn-warning'>
                    <FontAwesomeIcon className='action-icon' icon={faUndo} />
                    Revert changes
                </button>
                <button
                    onClick={() => actions.handleDeleteComponent(component.index)}
                    className='actions-button btn btn-danger'>
                    <FontAwesomeIcon className='action-icon' icon={faTrashAlt} />
                    Delete component
                </button>
            </div>
        </div>
    );
}

ElementToolbarComponent.propTypes = {
    component: PropTypes.shape({
        name: PropTypes.string.isRequired,
        innerText: PropTypes.string.isRequired
    }),
    actions: PropTypes.shape({
        handleChangeEditMode: PropTypes.func.isRequired,
        handleForceExitEditMode: PropTypes.func.isRequired,
        handleDeleteComponent: PropTypes.func.isRequired
    }).isRequired,
    handleComponentValueChange: PropTypes.func.isRequired
};
 
export default ElementToolbarComponent;