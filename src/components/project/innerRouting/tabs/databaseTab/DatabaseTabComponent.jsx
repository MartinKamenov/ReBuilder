import React from 'react';
import ButtonComponent from '../../../../common/ButtonComponent';

import './DatabaseTabComponent.css';

const DatabaseTabComponent = () => (
    <div className='center-container'>
        <input
            placeholder='Table name'
            style={{
                height: '40px'
            }}/>
        <ButtonComponent
            type='primary'
            style={{
                width: '100px',
                height: '40px'
            }}
            title='Add table'/>
    </div>
);
 
export default DatabaseTabComponent;