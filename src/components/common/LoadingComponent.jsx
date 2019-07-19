import React from 'react';
import ReactLoading from 'react-loading';

import PropTypes from 'prop-types';
import './LoadingComponent.css';

const LoadingComponent = ({ message }) => {
    return (
        <div className='loading-component'>
            <div className='loading-container'>
                <ReactLoading type='cylon' color='#E53B52' height={100} width={100} />
            </div>
            <div className='loading-text'>{message}</div>
        </div>
    );
};

LoadingComponent.propTypes = {
    message: PropTypes.string.isRequired
};
 
export default LoadingComponent;