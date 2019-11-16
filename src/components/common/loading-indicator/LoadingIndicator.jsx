import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './LoadingIndicator.css';

const LoadingIndicator = ({ message, color }) => {
    return (
        <div>
            <CircularProgress color={color || 'secondary'} />
            <span>{message || 'Loading'}</span>
        </div>
    );
};
 
export default LoadingIndicator;