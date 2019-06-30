import React, { Component } from 'react';
import * as authenticationActions from '../../../actions/projectActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './NewProjectPageComponent.css';

class NewProjectPageComponent extends Component {
    state = { 
        name: '',
        projectImage: ''
    }

    handleChangeInput = (text, field) => {
        this.setState({ [field]: text });
    }

    handleCreateProject = () => {
        if(!this.state.name || !this.state.projectImage) {
            return;
        }
        this.props.actions.createProject(this.state.name, this.state.projectImage);
    }

    render() {
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
        project: state.project
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authenticationActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectPageComponent);