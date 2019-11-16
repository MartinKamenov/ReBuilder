import React from 'react';
import PropTypes from 'prop-types';
import './ButtonComponent.css';
import Button from '@material-ui/core/Button';

const getColorFromType = (type) => {
    switch(type) {
    case 'success':
    case 'primary':
        return 'primary';
    case 'danger':
    case 'warning':
        return 'secondary';
    default:
        return 'primary';
    }
};

const ButtonComponent = ({
    title,
    style,
    color,
    variant,
    type,
    onClick,
    className,
    rounded,
    children
}) => {
    if(rounded === undefined) {
        rounded = true;
    }

    console.log(color || getColorFromType(type));

    if(children && children.length > 0) {
        return (
            <Button
                variant={variant || 'contained'}
                color={color || getColorFromType(type)}
                style={style}
                className={
                    `custom-button ${className} ${rounded ? 'custom-buttom-rounded':''}`
                }
                onClick={onClick}>
                {children}
            </Button>
        );
    }

    return (
        <Button
            className={className}
            style={style}
            variant={variant || 'contained'}
            color={color || getColorFromType(type)}
            onClick={onClick}>
            {title}
        </Button>
    );
};

ButtonComponent.propTypes = {
    title: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.string,
    variant: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    rounded: PropTypes.bool
};

export default ButtonComponent;