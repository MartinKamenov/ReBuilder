import React from 'react';
import PropTypes from 'prop-types';
import './ButtonComponent.css';

const ButtonComponent = ({ title, style, type, onClick, className, rounded, children }) => {
    if(rounded === undefined) {
        rounded = true;
    }

    if(children && children.length > 0) {
        return (
            <button
                style={style}
                className={
                `custom-button ${className} custom-button-${type} ${rounded ? 'custom-buttom-rounded':''}`
                }
                onClick={onClick}>
                {children}
            </button>
        );
    }

    return (
        <button
            style={style}
            className={
            `custom-button ${className} custom-button-${type} ${rounded ? 'custom-buttom-rounded':''}`
            }
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
    children: PropTypes.array,
    rounded: PropTypes.bool
};

export default ButtonComponent;