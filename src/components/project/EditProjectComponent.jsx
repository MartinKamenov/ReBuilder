import React, { Component } from 'react';
import ProjectComponentsList from './projectDraggableComponents/ProjectComponentsList';
import ProjectPageComponent from './projectDropList/ProjectPageComponent';
import ElementToolbarComponent from './elementToolbar/ElementToolbarComponent';
import componentTypes from './components/componentTypes';
import projectGenerator from '../../service/projectGenerator.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSave } from '@fortawesome/free-solid-svg-icons';
import LoadingComponent from '../common/LoadingComponent';
import * as projectActions from '../../actions/projectActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import './EditProjectComponent.css';

class EditProjectComponent extends Component {
    state = {
        id: 0,
        draggableComponents: componentTypes,
        droppedComponents: [],
        newIndex: 0,
        previousInnerText: '',
        isInitialyLoaded: true,
        isLoading: true
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        if(!this.props.user.id && !token) {
            const history = this.props.history;
            history.push('/');
            return;
        }
        const id = this.props.match.params.id;
        this.setState({ id });
        this.props.actions.updateProject(id, null, token);
    }

    generateProject = () => {
        projectGenerator.generateProject(this.props.project.name, this.state.droppedComponents);
    }

    handleDropComponent = (event) => {
        const draggableComponents = this.state.draggableComponents;
        const foundElement = draggableComponents
            .find((draggableComponent) => draggableComponent.name === event.component);
        const componentElement = Object.assign({}, foundElement);
        const droppedComponents = this.state.droppedComponents;
        componentElement.innerText = componentElement.name;
        componentElement.isInEditMode = false;
        componentElement.index = this.state.newIndex;
        droppedComponents.push(componentElement);

        this.setState({ droppedComponents, newIndex: this.state.newIndex + 1 });
    }

    handleChangeEditMode = (index) => {
        const droppedComponents = this.state.droppedComponents;

        droppedComponents[index].isInEditMode = !droppedComponents[index].isInEditMode;
        droppedComponents.forEach((component, i) => {
            if(i !== index) {
                component.isInEditMode = false;
            }
        });

        if(droppedComponents[index].isInEditMode) {
            this.setState({previousInnerText: droppedComponents[index].innerText});
        }

        this.setState({ droppedComponents });
    }

    handleForceExitEditMode = (index) => {
        const droppedComponents = this.state.droppedComponents;
        droppedComponents[index].isInEditMode = false;
        droppedComponents[index].innerText = this.state.previousInnerText;

        this.setState({ droppedComponents, previousInnerText: '' });
    }

    handleComponentValueChange = (text, field) => {
        const droppedComponents = this.state.droppedComponents;
        const {componentInEditMode, index} = this.getComponentInEditMode();
        componentInEditMode[field] = text;
        droppedComponents[index] = componentInEditMode;

        this.setState({ droppedComponents });
    }

    handleSaveProject = () => {
        let token = localStorage.getItem('token');
        if(!token) {
            return;
        }

        const droppedComponents = this.state.droppedComponents;
        
        this.props.actions.updateProject(this.state.id, droppedComponents, token);
    }

    getComponentInEditMode = () => {
        let index = -1;
        const component = this.state.droppedComponents.find((comp, i) => {
            if(comp.isInEditMode) {
                index = i;
            }

            return comp.isInEditMode;
        });

        return { componentInEditMode: component, index };
    }

    render() {
        if(this.props.project.id && this.state.isInitialyLoaded) {
            this.setState({
                isInitialyLoaded: false,
                droppedComponents: this.props.project.components.slice(0),
                isLoading: false
            });
        }

        if(this.state.isLoading) {
            return <LoadingComponent message='Fetching project' />
        }

        const { componentInEditMode, index } = this.getComponentInEditMode();
        return (
            <div>
                <h1 className='project-name-header'>{this.props.project.name}</h1>
                <div className='new-project-name-outer-container'>
                    <div className='new-project-name-inner-container'>
                        <div className='generate-project-btn-container'>
                            <button
                                className='btn btn-primary generate-project-btn'
                                onClick={this.handleSaveProject}>
                                <FontAwesomeIcon icon={faSave} /> 
                                <span className='new-project-btn-text'>Save project</span>
                            </button>
                            <button 
                                className='btn btn-success generate-project-btn'
                                onClick={this.generateProject}>
                                <FontAwesomeIcon icon={faDownload} />
                                <span className='new-project-btn-text'>Generate project</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="drag-drop-container">
                    <ProjectComponentsList
                        draggableComponents={this.state.draggableComponents}/>
                    <ProjectPageComponent
                        handleComponentValueChange={this.handleComponentValueChange}
                        handleChangeEditMode={this.handleChangeEditMode}
                        handleForceExitEditMode={this.handleForceExitEditMode}
                        droppedComponents={this.state.droppedComponents}
                        handleDropComponent={this.handleDropComponent}/>
                    <ElementToolbarComponent
                        component={componentInEditMode}
                        index={index}
                        handleComponentValueChange={this.handleComponentValueChange}/>
                </div>
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
 
export default connect(mapStateToProps, mapDispatchToProps)(EditProjectComponent);