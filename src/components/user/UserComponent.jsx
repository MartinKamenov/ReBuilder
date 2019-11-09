import React, { useState, useEffect, useCallback } from 'react';
import * as authenticationActions from '../../actions/authenticationActions';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faSave } from '@fortawesome/free-solid-svg-icons';

import ButtonComponent from '../common/button/ButtonComponent';
import apiService from '../../service/api.service';
import LoadingComponent from '../common/loading-page/LoadingComponent';
import successMessages from '../../constants/successMessages';
import PropTypes from 'prop-types';

import './UserComponent.css';

const UserComponent = ({ history }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector((state) => (state.user));

    const token = localStorage.getItem('token');

    const dispatch = useDispatch();
    const loginByToken = useCallback((token, message) => {
        dispatch(authenticationActions.loginByToken(token, message));
    }, [dispatch]);

    const logout = useCallback(() => {
        dispatch(authenticationActions.logout());
    }, [dispatch]);

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

    const updateUser = async () => {
        const token = localStorage.getItem('token');
        if(!token) {
            return;
        }

        const userInformation = {};
        userInformation.imageUrl = imageUrl;

        await apiService.updateUser(userInformation, token);

        loginByToken(token, successMessages.PROFILE_SAVED);
    };

    useEffect(() => {
        if(!user.id && !token) {
            history.push('/login');
            return;
        }
        setImageUrl(user.imageUrl);
    }, [user, token, history]);

    if(isLoading) {
        return <LoadingComponent message='Uploading image'/>;
    }

    return (
        <div className='user-container'>
            <div className='center-container user-details'>
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
                <h3 className='username-header'>
                    {user.username}
                </h3>
                <ButtonComponent
                    className='logout-btn'
                    type='success'
                    onClick={updateUser}>
                    <FontAwesomeIcon className='action-icon' icon={faSave} />
                    Save changes
                </ButtonComponent>
                <ButtonComponent
                    className='logout-btn'
                    type='danger'
                    onClick={logout}>
                    <FontAwesomeIcon className='action-icon' icon={faUndo} />
                    Logout
                </ButtonComponent>
            </div>
        </div>
    );
};

UserComponent.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default UserComponent;