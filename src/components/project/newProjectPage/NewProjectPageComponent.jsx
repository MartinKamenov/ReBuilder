import React, { Component } from 'react';
import * as projectActions from '../../../actions/projectActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoadingComponent from '../../common/LoadingComponent';

import './NewProjectPageComponent.css';

class NewProjectPageComponent extends Component {
    state = { 
        name: '',
        projectImage: '',
        isLoading: false
    }

    handleChangeInput = (text, field) => {
        this.setState({ [field]: text });
    }

    handleCreateProject = () => {
        if(!this.state.name || !this.state.projectImage || !this.props) {
            return;
        }
        
        this.setState({ isLoading: true });

        this.props.actions.createProject(this.state.name, this.state.projectImage, this.props.user.token);
    }

    render() {
        if(this.props.project.id) {
            this.setState({ isLoading: false });
            const history = this.props.history;
            history.push(`/projects/${this.props.project.id}`);
        }

        if(this.state.isLoading) {
            return <LoadingComponent message='Creating user' />;
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
                <button
                    onClick={this.handleCreateProject}
                    className='btn btn-success project-page-button'>Create new project</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.project,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(projectActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectPageComponent);
