import React, { Component } from 'react';
import templates from '../../../service/ready-templates/';
import uuid from 'uuid';
import * as projectActions from '../../../actions/projectActions';
import * as authenticationActions from '../../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './TemplateSelectPageComponent.css';
import LoadingComponent from '../../common/LoadingComponent';
import TemplatesTabComponent from './TemplatesTabComponent';

class TemplateSelectPageComponent extends Component {
    state = {
        isLoading: false
    }
    selectTemplate = (index) => {
        const project = Object.assign({}, templates[index]);
        project.id = uuid.v1();
        this.handleCreateProject(project);
    }

    handleCreateProject = (project) => {
        this.setState({ isLoading: true });
        const name = this.props.location.state.name;
        const imageUrl = this.props.location.state.imageUrl;
        project.name = name;
        project.projectImageUrl = imageUrl;
        this.props.actions
            .createProject(name, imageUrl, this.props.user.token, project);
    }

    componentWillReceiveProps(props) {
        if(props.project.id) {
            this.setState({ isLoading: false });
            const history = this.props.history;
            history.push(`projects/${props.project.id}`);
        }
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingComponent message='Creating project'/>;   
        }
        return (
            <div className='container'>
                {templates.map((template) => (
                    <TemplatesTabComponent
                        selectTemplate={this.selectTemplate}
                        template={template}
                        key={template.id}>
                    </TemplatesTabComponent>
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