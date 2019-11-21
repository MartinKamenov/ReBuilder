import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ButtonComponent from '../../common/button/ButtonComponent';
import InputComponent from '../../common/input/InputComponent';
import './ProjectActionsComponent.css';
import apiService from '../../../service/api.service';
import LoadingIndicator from '../../common/loading-indicator/LoadingIndicator';
import * as projectActions from '../../../actions/projectActions';
import * as authenticationActions from '../../../actions/authenticationActions';

const defaultProjectImage = 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

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
const ProjectActionsComponent = ({ history, type, projectInformation = {}, open, setOpen }) => {
    const [name, setName] = useState(projectInformation.name || '');
    const [description, setDescription] = useState(projectInformation.description || '');
    const [imageUrl, setImageUrl] = useState(projectInformation.projectImageUrl || defaultProjectImage);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreated, setIsCreated] = useState(false);

    const {project, user, error} = useSelector((state) => state);
    const dispatch = useDispatch();

    const createProject = useCallback(() => {
        dispatch(projectActions.createProject(name, imageUrl, description, user.token));
    }, [dispatch, name, imageUrl, user, description]);

    const updateProjectInformation = useCallback(() => {
        dispatch(projectActions.updateProjectInformation(
            projectInformation.id, name, imageUrl, description, user.token
        ));
    }, [
        projectInformation,
        dispatch,
        name,
        imageUrl,
        user,
        description
    ]);

    const token = localStorage.getItem('token');

    const loginByToken = useCallback(() => {
        dispatch(authenticationActions.loginByToken(token));
    }, [dispatch, token]);

    const handleProjectAction = useCallback(() => {
        setOpen(false);
        if(!name || !imageUrl) {
            return;
        }
        setIsLoading(true);
        setIsCreated(true);
        type === 'create' ? 
            createProject() :
            updateProjectInformation();
    }, [name, imageUrl, createProject, updateProjectInformation, setOpen, type]);

    const handleDeleteProject = () => {
        setOpen(false);
        setIsLoading(true);
        setIsCreated(true);

        dispatch(projectActions.deleteProject(
            projectInformation.id, user.token
        ));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const changeImage = async({ target }) => {
        if (!target.files || !target.files[0]) {
            return;
        }

        setIsLoading(true);

        const file = target.files[0];
        const formData = new FormData();
        formData.append('image', file, file.name);

        try {
            const res = await apiService.uploadImage(formData);
            setImageUrl(res.data.data.link);
            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        debugger;
        if(error) {
            setIsLoading(false);
        }

        if(project.id && isCreated && type === 'create') {
            loginByToken(user.token);
            setIsLoading(false);
            history.push(`/projects/${project.id}`);
        } else if(project.id && isCreated) {
            loginByToken(user.token);
            setIsLoading(false);
            history.push('/dashboard');
        }
    }, [
        project,
        history,
        error,
        dispatch,
        isCreated,
        user,
        loginByToken,
        type
    ]);

    const dialogHeader = (type === 'create') ? 'Create new project' : 'Update current project';
    const actionButton = (type === 'create') ? 'Create project' : 'Update project';

    return (
        <div className='center-container'
            style={{
                marginTop: '-30px',
                marginBottom: '10px',
                display: 'none'
            }}>
            { isLoading ? <LoadingIndicator message='Uploading image' /> : null }
            <Dialog fullWidth onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
                <DialogTitle id='customized-dialog-title' onClose={handleClose}>
                    {dialogHeader}
                </DialogTitle>
                <DialogContent dividers>
                    <div
                        onClick={(event) => {
                            const element = document.getElementById('change-element-image');
                            element.click(event);
                        }}
                        className='user-image-container'>
                        <img
                            className='user-component-user-image'
                            alt='User'
                            src={imageUrl}/>
                        <div className="user-image-overlay">
                            Upload new image
                        </div>
                    </div>
                    <input
                        id='change-element-image'
                        className='change-element-image'
                        onChange={changeImage}
                        type='file'
                        accept='image/*'/>
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
                        placeholder='Description'
                        value={description}
                        onChange={({target: {value}}) => setDescription(value)} />
                </DialogContent>
                <DialogActions>
                    {type === 'create' ? null : (
                    <ButtonComponent style={{ fontSize: 12 }} onClick={handleDeleteProject} color='secondary'>
                        Delete project
                    </ButtonComponent>
                    )}
                    <ButtonComponent style={{ fontSize: 12 }} onClick={handleProjectAction} color='primary'>
                        {actionButton}
                    </ButtonComponent>
                </DialogActions>
            </Dialog>
        </div>
    );
};
 
export default ProjectActionsComponent;