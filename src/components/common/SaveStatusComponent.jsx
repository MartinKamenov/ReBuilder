import React from 'react';
import './SaveStatusComponent.css';
import PropTypes from 'prop-types';

const SaveStatusComponent = ({ saveStatus }) => {
    return (
        <span className='save-status-container'>
            Status: {saveStatus}
        </span>
    );
};

SaveStatusComponent.propTypes = {
    saveStatus: PropTypes.string.isRequired
};
 
export default SaveStatusComponent;