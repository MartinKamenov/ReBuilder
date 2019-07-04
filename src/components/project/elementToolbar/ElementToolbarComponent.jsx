import React from 'react';
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types';
import './ElementToolbarComponent.css';

const ElementToolbarComponent = ({component, index, handleComponentValueChange}) => {
    if(!component) {
        return (
            <div className='toolbar-container'>
                <h3>Toolbar</h3>
                <div>Select an element by clicking on it</div>
            </div>
        )
    }
    return (
        <div className='toolbar-container'>
            <div className='toolbar-element-container'>
                <div className='component-input-changer-container'>
                    <label className='component-changer-label'>Text</label>
                    <input
                        className='component-changer-input'
                        onChange={(event) => handleComponentValueChange(event.target.value, 'innerText')}
                        value={component.innerText}
                        placeholder='Text'>
                    </input>
                </div>
                <div className='component-input-changer-container'>
                    <label className='component-changer-label'>Font-size</label>
                    <input
                        className='component-changer-input'
                        onChange={(event) => handleComponentValueChange(event.target.value, 'style.fontSize')}
                        value={component.style.fontSize}
                        placeholder='Font size'>
                    </input>
                </div>
                <div className='component-input-changer-container'>
                    <label className='component-changer-label'>Width</label>
                    <input
                        className='component-changer-input'
                        onChange={(event) => handleComponentValueChange(event.target.value, 'style.width')}
                        value={component.style.width}
                        placeholder='Element width'>
                    </input>
                </div>
                <div className='component-input-changer-container'>
                    <label className='component-changer-label'>Height</label>
                    <input
                        className='component-changer-input'
                        onChange={(event) => handleComponentValueChange(event.target.value, 'style.height')}
                        value={component.style.height}
                        placeholder='Element height'>
                    </input>
                </div>
            </div>
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
    );
}

ElementToolbarComponent.propTypes = {
    component: PropTypes.shape({
        name: PropTypes.string.isRequired,
        innerText: PropTypes.string.isRequired
    }),
    index: PropTypes.number,
    handleComponentValueChange: PropTypes.func.isRequired
};
 
export default ElementToolbarComponent;