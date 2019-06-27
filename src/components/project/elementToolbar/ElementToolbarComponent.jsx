import React from 'react';
import { SketchPicker } from 'react-color'
import './ElementToolbarComponent.css';

const ElementToolbarComponent = () => {
    return (
        <div className='toolbar-container'>
            <SketchPicker/>
            <input
                placeholder='Text color'
                disabled></input>
            <input
                placeholder='Background color'
                disabled></input>
        </div>
    );
}
 
export default ElementToolbarComponent;