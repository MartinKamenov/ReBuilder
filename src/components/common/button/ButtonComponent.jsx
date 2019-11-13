import React from 'react';
import PropTypes from 'prop-types';
import './ButtonComponent.css';
import Button from '@material-ui/core/Button';

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

    if(children && children.length > 0) {
        return (
            <Button
                variant={variant}
                color={color}
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
            variant={variant}
            color={color}
            onClick={onClick}>
            {title}
        </Button>
    );
};

ButtonComponent.propTypes = {
    title: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    rounded: PropTypes.bool
};

export default ButtonComponent;