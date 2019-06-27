import React from 'react';
import { SliderPicker } from 'react-color';
import PropTypes from 'prop-types';
import './ElementToolbarComponent.css';

const ElementToolbarComponent = ({component}) => {
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
            <SliderPicker style={{width: '200px'}} />
            <input
                value={component.innerText}
                placeholder='Text'
                disabled></input>
            <input
                placeholder='Background'
                disabled></input>
        </div>
    );
}

ElementToolbarComponent.propTypes = {
    component: PropTypes.shape({
        name: PropTypes.string.isRequired,
        innerText: PropTypes.string.isRequired
    })
};
 
export default ElementToolbarComponent;