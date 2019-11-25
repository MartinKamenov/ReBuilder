import React from 'react';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';

import './InputComponent.css';

const CustomInput = styled(TextField)({
    height: 48,
    width: '100%'
});
const InputComponent = ({
    value,
    onChange,
    type,
    placeholder,
    style,
    className,
    autoFocus,
    rows,
    variant,
    multiline,
    error
}) => {
    return (
        <div className={className}
            style={style}>
            <CustomInput
                multiline={multiline}
                variant={variant}
                rows={rows}
                autoFocus={autoFocus}
                onChange={onChange}
                value={value}
                style={style}
                type={type}
                label={placeholder}
                helperText={error || null}
                error={!!error}
                InputProps={{
                    style: {
                        fontSize: 20,
                    },
                }}
                InputLabelProps={{
                    style: {
                        fontSize: 15,
                    }
                }}
                FormHelperTextProps={{
                    style: {
                        fontSize: 10,
                    }
                }}
            />
        </div>
    );
};
 
export default InputComponent;