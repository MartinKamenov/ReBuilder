import React from 'react';
import ButtonComponent from '../../../../common/ButtonComponent';

import './DatabaseTabComponent.css';

const DatabaseTabComponent = () => (
    <div className='center-container'>
        <input
            className='table-name-input'
            placeholder='Table name'/>
        <ButtonComponent
            className='create-table-btn'
            type='primary'
            title='Add table'/>
    </div>
);
 
export default DatabaseTabComponent;