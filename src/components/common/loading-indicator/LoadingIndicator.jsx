import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import './LoadingIndicator.css';

const LoadingIndicator = ({ message, color }) => {
    return (
        <Card style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            position: 'fixed',
            top: 'calc(100vh - 100px)',
            right: '100px',
            background: '#2A3642',
            height: '60px',
        }}>
            <div className='circular-progress-container'>
                <CircularProgress color={color || 'secondary'} />
            </div>
            <p className='loading-header'>{message || 'Loading'}</p>
        </Card>
    );
};
 
export default LoadingIndicator;