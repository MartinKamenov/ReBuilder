import React, { useState, useCallback, useEffect} from 'react';
import * as projectActions from '../../../actions/projectActions';
import * as authenticationActions from '../../../actions/authenticationActions';
import { useSelector, useDispatch } from 'react-redux';
import LoadingComponent from '../../common/LoadingComponent';
import ButtonComponent from '../../common/ButtonComponent';
import apiService from '../../../service/api.service';

import './NewProjectPageComponent.css';


const NewProjectPageComponent = ({ history }) => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('https://cdn3.iconfinder.com/data/icons/lifestyle/100/Noun_Project_20Icon_10px_grid-01-512.png');
    const [isLoading, setIsLoading] = useState(false);
    const [isCreated, setIsCreated] = useState(false);

    const {project, user, error} = useSelector((state) => state);
    const dispatch = useDispatch();

    const createProject = useCallback(() => {
        dispatch(projectActions.createProject(name, imageUrl, user.token));
    }, [dispatch, name, imageUrl, user]);

    const token = localStorage.getItem('token');

    const loginByToken = useCallback(() => {
        dispatch(authenticationActions.loginByToken(token));
    }, [dispatch, token]);

    const handleCreateProject = useCallback(() => {
        if(!name || !imageUrl) {
            return;
        }
        setIsLoading(true);
        setIsCreated(true);
        createProject(name, imageUrl, user.token);
    }, [name, imageUrl, user, createProject]);

    const handleEnterPressed = useCallback((key) => {
        if (key === 'Enter') {
            handleCreateProject();
        }
    }, [handleCreateProject]);

    const redirectToTemplates = () => {
        if(!name || !imageUrl) {
            return;
        }
        
        history.push({
            state: {
                name,
                imageUrl
            },
            pathname: '/templates'
        });
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
        if(error) {
            setIsLoading(false);
        }

        if(project.id  && isCreated) {
            loginByToken(user.token);
            setIsLoading(false);
            history.push(`/projects/${project.id}`);
        }
    }, [project, history, error, dispatch, isCreated]);

    if(isLoading) {
        return <LoadingComponent message='Creating project' />;
    }

    return (
        <div className='center-container' onKeyDown={(event) => handleEnterPressed(event.key)}>
            <div
                onClick={(event) => {
                    const element = document.getElementById('change-element-image');
                    element.click(event);
                }}
                className='project-image-container'>
                <img
                    className='project-component-project-image'
                    alt='Project'
                    src={imageUrl}/>
                <div className="project-image-overlay">
                    Upload new image
                </div>
                <input
                    id='change-element-image'
                    className='change-element-image'
                    onChange={changeImage}
                    type='file'
                    accept='image/*'/>
            </div>
            <div>
                <label className='project-page-label'>Project name</label>
                <input
                    className='project-page-input'
                    placeholder='Add name here'
                    value={name}
                    onChange={(event) => setName(event.target.value)}/>
            </div>
            <ButtonComponent
                title='Create new project'
                className='submit-btn'
                type='success'
                onClick={handleCreateProject}/>
            <ButtonComponent
                title='Select a template'
                className='submit-btn'
                type='warning'
                onClick={redirectToTemplates}/>
        </div>
    );
};

export default NewProjectPageComponent;
