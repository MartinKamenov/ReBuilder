import React, { Component } from 'react';
import * as projectActions from '../../../actions/projectActions';
import * as authenticationActions from '../../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoadingComponent from '../../common/LoadingComponent';
import ButtonComponent from '../../common/ButtonComponent';
import apiService from '../../../service/api.service';

import './NewProjectPageComponent.css';

class NewProjectPageComponent extends Component {
    state = { 
        name: '',
        imageUrl: 'https://cdn3.iconfinder.com/data/icons/lifestyle/100/Noun_Project_20Icon_10px_grid-01-512.png',
        isLoading: false,
        isCreated: false
    }

    componentWillReceiveProps(props) {
        if(props.error) {
            this.setState({ isLoading: false });
        }

        if(props.project.id  && this.state.isCreated) {
            props.actions.loginByToken(props.user.token);
            this.setState({ isLoading: false });
            const history = props.history;
            history.push(`/projects/${props.project.id}`);
        }
    }

    handleChangeInput = (text, field) => {
        this.setState({ [field]: text });
    }

    handleEnterPressed = (key) => {
        if (key === "Enter") {
            this.handleCreateProject();
        }
    }

    handleCreateProject = () => {
        if(!this.state.name || !this.state.imageUrl) {
            return;
        }
        this.setState({ isLoading: true, isCreated: true });
        this.props.actions.createProject(this.state.name, this.state.imageUrl, this.props.user.token);
    }

    changeImage = async(event) => {
        const target = event.target;
        if (!target.files || !target.files[0]) {
            return;
        }

        const file = target.files[0];
        const formData = new FormData();
        formData.append('image', file, file.name);

        try {
            const res = await apiService.uploadImage(formData);
            this.setState({ imageUrl: res.data.data.link });
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingComponent message='Creating project' />;
        }

        return (
            <div className='center-container' onKeyDown={(event) => this.handleEnterPressed(event.key)}>
                <img
                    className='new-project-image'
                    alt='Project'
                    src={this.state.imageUrl}/>
                <input
                    type='file'
                    className='image-input'
                    placeholder='Add url here'
                    onChange={this.changeImage}/>
                <div>
                    <label className='project-page-label'>Project name</label>
                    <input
                        className='project-page-input'
                        placeholder='Add name here'
                        value={this.state.name}
                        onChange={(event) => this.handleChangeInput(event.target.value, 'name')}/>
                </div>
                <ButtonComponent
                    title='Create new project'
                    className='submit-btn'
                    type='success'
                    onClick={this.handleCreateProject}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.project,
        user: state.user,
        error: state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Object.assign({}, projectActions, authenticationActions), dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectPageComponent);
