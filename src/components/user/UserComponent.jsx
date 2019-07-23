import React, { Component } from 'react';
import * as authenticationActions from '../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faSave } from '@fortawesome/free-solid-svg-icons';

import './UserComponent.css';
import ButtonComponent from '../common/ButtonComponent';
import apiService from '../../service/api.service';
import { async } from 'q';
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

    render() {
        if(this.state.isLoading) {
            return <LoadingComponent message='Uploading image'/>;
        }

        const user = this.props.user;
        return (
            <div className='center-container user-container'>
                <img
                    className='user-component-user-image'
                    alt='user image'
                    src={this.state.imageUrl}/>
                <input onChange={this.changeImage} type='file' name='pic' accept='image/*'/>
                <h3>
                    {user.username}
                </h3>
                <ButtonComponent
                    className='logout-btn'
                    type='success'
                    onClick={this.logout}>
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