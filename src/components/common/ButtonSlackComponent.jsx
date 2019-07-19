import React from 'react';
import PropTypes from 'prop-types';
import './ButtonSlackComponent.css';

const ButtonSlackComponent = ({ title, style, type, onClick, rounded, children }) => {
    if(rounded === undefined) {
        rounded = true;
    }

    if(children && children.length > 0) {
        return (
            <button
                style={style}
                className={'button2'}
                onClick={onClick}>
                {children}
            </button>
        );
    }

    return (
        <button
            style={style}
            className={'button2'}
            onClick={onClick}>
            {title}
        </button>
    );
};

ButtonSlackComponent.propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.array,
    rounded: PropTypes.bool
};

export default ButtonSlackComponent;