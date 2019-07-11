import React from 'react';
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashAlt, faUndo } from '@fortawesome/free-solid-svg-icons';
import './ElementToolbarComponent.css';

const ElementToolbarComponent = ({component, handleComponentValueChange}) => {
    if(!component) {
        return (
            <div className='toolbar-container'>
                <h3>Toolbar</h3>
                <div>Select an element by clicking on it</div>
            </div>
        )
    }
    const inputs = Object.keys(component).filter((c) =>
        (c !== 'style' && c !== 'isInEditMode' && c !== 'index' && c !== 'name'));
    const styles = Object.keys(component.style).filter((c) => (c !== 'color' && c !== 'backgroundColor'));
    return (
        <div className='toolbar-container'>
            <div className='vertical-scrollable-container toolbar-scrollable'>
                <div className='toolbar-element-container'>
                    <h3>Properties</h3>
                    {
                        inputs.map((input) => {
                            return (
                                <div className='component-input-changer-container'>
                                    <label className='component-changer-label'>{input}</label>
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
                        styles.map((style) => {
                            return (
                                <div className='component-input-changer-container'>
                                    <label className='component-changer-label'>{style}</label>
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
                <button className='actions-button btn btn-success'>
                    <FontAwesomeIcon className='action-icon' icon={faCheck} />
                    Accept changes
                </button>
                <button className='actions-button btn btn-warning'>
                    <FontAwesomeIcon className='action-icon' icon={faUndo} />
                    Revert changes
                </button>
                <button className='actions-button btn btn-danger'>
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
    handleComponentValueChange: PropTypes.func.isRequired
};
 
export default ElementToolbarComponent;