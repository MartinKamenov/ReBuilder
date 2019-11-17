import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Create new project
            </DialogTitle>
            <DialogContent dividers>
            <Typography gutterBottom>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </Typography>
            <Typography gutterBottom>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
            </Typography>
            <Typography gutterBottom>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                auctor fringilla.
            </Typography>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
                Create project
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
 
export default CreateProjectComponent;