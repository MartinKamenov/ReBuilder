import React, { Component } from 'react';
import * as authenticationActions from '../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faSave } from '@fortawesome/free-solid-svg-icons';

import './UserComponent.css';
import ButtonComponent from '../common/ButtonComponent';
import apiService from '../../service/api.service';
import LoadingComponent from '../common/LoadingComponent';

class UserComponent extends Component {
    state = {
        imageUrl: '',
        isLoading: false
    }

    componentDidMount() {
        this.setState({ imageUrl: this.props.user.imageUrl });
    }
    componentWillReceiveProps(props) {
        const token = localStorage.getItem('token');
        if(!props.user.id && !token) {
            const history = this.props.history;
            history.push('/login');
            return;
        }
    }
    logout = () => {
        this.props.actions.logout();
    }

    changeImage = async(event) => {
        const target = event.target;
        if (!target.files || !target.files[0]) {
            return;
        }

        this.setState({ isLoading: true });

        const file = target.files[0];
        const formData = new FormData();
        formData.append('image', file, file.name);

        try {
            const res = await apiService.uploadImage(formData);
            this.setState({ imageUrl: res.data.data.link, isLoading: false });
        } catch(error) {
            this.setState({ isLoading: false });
            console.log(error);
        }
    }

    updateUser = async () => {
        const token = localStorage.getItem('token');
        if(!token) {
            return;
        }

        const userInformation = {};
        userInformation.imageUrl = this.state.imageUrl;

        await apiService.updateUser(userInformation, token);

        this.props.actions.loginByToken(token, 'Updated successfully');
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingComponent message='Uploading image'/>;
        }

        const user = this.props.user;
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
                            src={this.state.imageUrl}/>
                        <div className="user-image-overlay">
                            Upload new image
                        </div>
                    </div>
                    <input
                        id='change-element-image'
                        className='change-element-image'
                        onChange={this.changeImage}
                        type='file'
                        accept='image/*'/>
                    <h3 style={{ fontWeight: 'bold' }}>
                        {user.username}
                    </h3>
                    <ButtonComponent
                        className='logout-btn'
                        type='success'
                        onClick={this.updateUser}>
                        <FontAwesomeIcon className='action-icon' icon={faSave} />
                        Save changes
                    </ButtonComponent>
                    <ButtonComponent
                        className='logout-btn'
                        type='danger'
                        onClick={this.logout}>
                        <FontAwesomeIcon className='action-icon' icon={faUndo} />
                        Logout
                    </ButtonComponent>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        error: state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authenticationActions, dispatch)
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);