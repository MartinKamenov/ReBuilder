import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import PropTypes from 'prop-types';

const ProgressBarComponent = ({progress}) => (
    <div style={{
        margin: 'auto',
        width: '100px',
        height: '100px',
        backgroundColor: '#ffffff',
        borderRadius: '50%'
    }}>
        <CircularProgressbar value={progress} text={`${progress}%`} />
    </div>
);

ProgressBarComponent.propTypes = {
    progress: PropTypes.number.isRequired
};
 
export default ProgressBarComponent;