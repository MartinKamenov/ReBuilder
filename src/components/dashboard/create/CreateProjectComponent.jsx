import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../../common/button/ButtonComponent';
import InputComponent from '../../common/input/InputComponent';
import './CreateProjectComponent.css';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant='h6'>{children}</Typography>
            {onClose ? (
                <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
const CreateProjectComponent = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className='center-container' style={{ marginTop: '-30px', marginBottom: '10px' }}>
            <ButtonComponent
                style={{
                    width: 200,
                    fontWeight: 'bold',
                    fontSize: 12,
                    height: 50,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
                variant='outlined'
                color='secondary'
                className='vertical-centered'
                onClick={handleClickOpen}>
                <FontAwesomeIcon className='action-icon' icon={faPlusCircle} />
            Create new project
            </ButtonComponent>
            <Dialog fullWidth onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
                <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            Create new project
                </DialogTitle>
                <DialogContent dividers>
                    <InputComponent
                        className='form-input'
                        autoFocus
                        placeholder='Project name'
                        value={name}
                        onChange={({target: {value}}) => setName(value)} />
                    <InputComponent
                        multiline
                        className='form-input'
                        rows='4'
                        variant='filled'
                        autoFocus
                        placeholder='Description'
                        value={description}
                        onChange={({target: {value}}) => setDescription(value)} />
                </DialogContent>
                <DialogActions>
                    <ButtonComponent style={{ fontSize: 12 }} onClick={handleClose} color='secondary'>
                        Create project
                    </ButtonComponent>
                </DialogActions>
            </Dialog>
        </div>
    );
};
 
export default CreateProjectComponent;