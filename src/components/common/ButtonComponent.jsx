import React from 'react';
import './ButtonComponent.css';

const ButtonComponent = ({title, style, type, onClick, className}) => {
    return (
        <button
            style={style}
            className={`custom-button ${className} custom-button-${type}`}
            onClick={onClick}>
            {title}
        </button>
    );
};

export default ButtonComponent;