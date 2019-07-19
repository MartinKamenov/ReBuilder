import React, { Component } from 'react';
import * as projectActions from '../../../actions/projectActions';
import * as authenticationActions from '../../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoadingComponent from '../../common/LoadingComponent';
import ButtonComponent from '../../common/ButtonComponent';


import './NewProjectPageComponent.css';

class NewProjectPageComponent extends Component {
    state = { 
        name: '',
        projectImage: '',
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

    handleCreateProject = () => {

        if(!this.state.name || !this.state.projectImage || !this.props) {
            return;
        }
        
        this.setState({ isLoading: true, isCreated: true });

        this.props.actions.createProject(this.state.name, this.state.projectImage, this.props.user.token);
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingComponent message='Creating project' />;
        }

        return (
            <div className='center-container'>
                <div>
                    <label className='project-page-label'>Project name</label>
                    <input
                        className='project-page-input'
                        placeholder='Add name here'
                        value={this.state.name}
                        onChange={(event) => this.handleChangeInput(event.target.value, 'name')}/>
                    
                </div>
                <div>
                    <label className='project-page-label'>Project image</label>
                    <input
                        className='project-page-input'
                        placeholder='Add url here'
                        value={this.state.projectImage}
                        onChange={(event) => this.handleChangeInput(event.target.value, 'projectImage')}/>
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
