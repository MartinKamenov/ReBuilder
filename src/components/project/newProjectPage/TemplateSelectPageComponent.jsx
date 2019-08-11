import React, { Component } from 'react';
import templates from '../../../service/ready-templates/';
import ButtonComponent from '../../common/ButtonComponent';
import uuid from 'uuid';
import * as projectActions from '../../../actions/projectActions';
import * as authenticationActions from '../../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './TemplateSelectPageComponent.css';

class TemplateSelectPageComponent extends Component {
    selectTemplate = (index) => {
        const project = templates[index];
        project.id = uuid.v1();
        this.handleCreateProject(project);
    }

    handleCreateProject = (project) => {
        if(!this.state.name || !this.state.imageUrl) {
            return;
        }
        this.setState({ isLoading: true, isCreated: true });
        this.props.actions
            .createProject(this.state.name, this.state.imageUrl, this.props.user.token, project);
    }

    render() { 
        return (
            <div className='container'>
                {templates.map((template, i) => (
                    <ButtonComponent
                        type='success'
                        onClick={() => this.selectTemplate(i)}
                        key={i}>
                        {template.name}
                    </ButtonComponent>
                ))}
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
 
export default connect(mapStateToProps, mapDispatchToProps)(TemplateSelectPageComponent);