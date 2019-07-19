import React from 'react';
import PropTypes from 'prop-types';
import './ButtonComponent.css';

const ButtonComponent = ({ title, style, type, onClick, className, children }) => {
    if(children && children.length > 0) {
        return (
            <button
                style={style}
                className={`custom-button ${className} custom-button-${type}`}
                onClick={onClick}>
                {children}
            </button>
        );
    }

    return (
        <button
            style={style}
            className={`custom-button ${className} custom-button-${type}`}
            onClick={onClick}>
            {title}
        </button>
    );
};

ButtonComponent.propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.array
};

export default ButtonComponent;