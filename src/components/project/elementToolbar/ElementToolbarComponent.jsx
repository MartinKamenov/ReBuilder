import React from 'react';
import { SliderPicker } from 'react-color';
import PropTypes from 'prop-types';
import './ElementToolbarComponent.css';

const ElementToolbarComponent = ({component, index}) => {
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
                <label>Text</label>
                <input
                    value={component.innerText}
                    placeholder='Text'>
                </input>
            </div>
            <div className='toolbar-element-container'>
                <label>Font color</label>
                <SliderPicker style={{width: '200px'}} />
            </div>
            <div className='toolbar-element-container'>
                <label>Background color</label>
                <SliderPicker style={{width: '200px'}} />
            </div>
        </div>
    );
}

ElementToolbarComponent.propTypes = {
    component: PropTypes.shape({
        name: PropTypes.string.isRequired,
        innerText: PropTypes.string.isRequired
    }),
    index: PropTypes.number
};
 
export default ElementToolbarComponent;