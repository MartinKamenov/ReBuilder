import React, { Component } from 'react';
import ProjectComponentsList from './projectDraggableComponents/ProjectComponentsList';
import ProjectPageComponent from './projectDropList/ProjectPageComponent';
import ElementToolbarComponent from './elementToolbar/ElementToolbarComponent';
import componentObjects, { componentTypes } from './components/componentTypes';
import projectGenerator from '../../service/projectGenerator.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSave, faArrowAltCircleUp, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LoadingComponent from '../common/LoadingComponent';
import * as projectActions from '../../actions/projectActions';
import * as deploymentActions from '../../actions/deploymentActions';
import uuid from 'uuid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './EditProjectComponent.css';
import ButtonComponent from '../common/ButtonComponent';

class EditProjectComponent extends Component {
    state = {
        id: '',
        pageId: '',
        page: {
            elements: []
        },
        draggableComponents: componentObjects,
        droppedComponents: [],
        previousComponent: {},
        draggedComponentIndex: '',
        isInitialyLoaded: true,
        isLoading: true
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if(!this.props.user.id && !token) {
            const history = this.props.history;
            history.push('/');
            return;
        }
        const id = this.props.match.params.id;
        const pageId = this.props.match.params.pageId;

        this.setState({ id, pageId });
        this.props.actions.updateProject(id, null, token);
    }

    componentWillReceiveProps(props) {
        if(props.project.id && this.state.isInitialyLoaded) {
            const project = Object.assign({}, props.project);
            const page = project.pages.find((p) => this.state.pageId === p.id);

            // Adds routes to routinglink
            const draggableComponents = [...this.state.draggableComponents];
            let routerLinkComponentIndex = -1;
            const routerLinkComponent = draggableComponents
                .find((c, i) => {
                    if(c.name === componentTypes.RoutingLink) {
                        routerLinkComponentIndex = i;
                        return true;
                    }

                    return false;
                });

            routerLinkComponent.toValues = [...props.project.pages].map(page => page.route);
            draggableComponents[routerLinkComponentIndex] = routerLinkComponent;

            this.setState({
                draggableComponents,
                isInitialyLoaded: false,
                droppedComponents: [...page.elements],
                page,
                isLoading: false
            });
        }

        // Opens window in new tab after project is deployed
        if(props.projectStatus) {
            setTimeout(() => {
                const url = props.projectStatus.projectUrl;
                window.open(url, "_blank");
            }, 20000);
        }
    }

    generateProject = () => {
        const pages = [...this.props.project.pages];
        const index = pages.findIndex((p) => p.id === this.state.pageId);
        pages[index] = this.state.page;

        projectGenerator.generateProject(this.props.project.name, pages);
    }

    handleDropComponent = (event) => {
        const draggableComponents = this.state.draggableComponents;
        const foundElement = draggableComponents
            .find((draggableComponent) => draggableComponent.name === event.component);
        const componentElement = Object.assign({}, foundElement);
        const droppedComponents = this.state.droppedComponents;
        componentElement.innerText = componentElement.name;
        
        componentElement.isInEditMode = false;
        componentElement.index = uuid.v1();
        droppedComponents.push(componentElement);

        this.setState({ droppedComponents });
    }

    handleChangeEditMode = (index) => {
        const droppedComponents = [...this.state.droppedComponents];

        droppedComponents.find(c => c.index === index)
            .isInEditMode = !droppedComponents.find(c => c.index === index).isInEditMode;
        droppedComponents.forEach((component) => {
            if(component.index !== index) {
                component.isInEditMode = false;
            }
        });

        if(this.getComponentFromIndex(index).isInEditMode) {
            this.setState({ previousComponent: this.getComponentFromIndex(index) });
        }

        this.setState({ droppedComponents });
    }

    handleForceExitEditMode = (index) => {
        const droppedComponents = [...this.state.droppedComponents];
        const exitModeComponentIndex = droppedComponents.findIndex(c => c.index === index);
        droppedComponents[exitModeComponentIndex] = this.state.previousComponent;
        droppedComponents[exitModeComponentIndex].isInEditMode = false;

        this.setState({ droppedComponents, previousComponent: {} });
    }

    handleDeleteComponent = (index) => {
        const droppedComponents = this.state.droppedComponents
            .filter((c) => c.index !== index);

        this.setState({ droppedComponents, previousComponent: {} });
    }

    handleComponentValueChange = (value, field) => {
        const droppedComponents = this.state.droppedComponents;
        let {componentInEditMode, index} = this.getComponentInEditMode();
        componentInEditMode = Object.assign({}, componentInEditMode);
        if(value.hex) {
            const style = Object.assign({}, componentInEditMode.style);
            value = value.hex;
            style[field] = value;
            componentInEditMode.style = style;
        } else if(field.startsWith('style.')) {
            field = field.substring(6);
            const style = Object.assign({}, componentInEditMode.style);
            style[field] = value;
            componentInEditMode.style = style;
        } else {
            componentInEditMode[field] = value;
        }
        droppedComponents[index] = componentInEditMode;

        this.setState({ droppedComponents });
    }

    handleSaveProject = () => {
        const token = localStorage.getItem('token');
        if(!token) {
            return;
        }

        const droppedComponents = [...this.state.droppedComponents];
        const page = Object.assign({}, this.state.page);
        page.elements = droppedComponents;

        const pages = [...this.props.project.pages];
        const index = pages.findIndex((p) => p.id === this.state.pageId);
        pages[index] = page;

        this.setState({ page });
        
        this.props.actions.updateProject(this.state.id, pages, token);
    }

    handleDeployProject = async () => {
        this.props.actions.deployProject(this.state.id, this.props.user.token);
    }
    getComponentInEditMode = () => {
        let index = -1;
        let component = this.state.droppedComponents.find((c, i) => {
            if(c.isInEditMode) {
                index = i;
            }

            return c.isInEditMode;
        });

        return { componentInEditMode: component, index };
    }

    getComponentFromIndex = (index) => {
        return Object.assign({}, this.state.droppedComponents.find(c => c.index === index));
    }

    returnToRouting = () => {
        const history = this.props.history;
        history.push(`/projects/${this.state.id}`);
        return;
    }

    componentDragStart = (index) => {
        this.setState({ draggedComponentIndex: index });
    }

    rearangeComponents = (event) => {
        const dropIndex = event.nativeEvent.target.id;
        const draggedComponentIndex = this.state.draggedComponentIndex;
        if(dropIndex === draggedComponentIndex) {
            return;
        }

        const droppedComponents = [...this.state.droppedComponents];

        const firstIndex = droppedComponents.findIndex((c) => c.index === dropIndex);
        const secondIndex = droppedComponents.findIndex((c) => c.index === draggedComponentIndex);
        if(firstIndex === -1 || secondIndex === -1) {
            return;
        }

        const swap = droppedComponents[firstIndex];
        droppedComponents[firstIndex] = droppedComponents[secondIndex];
        droppedComponents[secondIndex] = swap;

        this.setState({ droppedComponents });
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingComponent message='Fetching project' />;
        }

        const { componentInEditMode } = this.getComponentInEditMode();
        return (
            <div>
                <h1 className='project-name-header'>{this.props.project.name}</h1>
                <div className='new-project-name-outer-container'>
                    <div className='new-project-name-inner-container'>
                        <div className='generate-project-btn-container'>
                            <ButtonComponent
                                type='danger'
                                className='generate-project-btn'
                                onClick={this.returnToRouting}>
                                <FontAwesomeIcon icon={faArrowLeft} /> 
                                <span className='new-project-btn-text'>Back to pages</span>
                            </ButtonComponent>
                            <ButtonComponent
                                type='primary'
                                className='generate-project-btn'
                                onClick={this.handleSaveProject}>
                                <FontAwesomeIcon icon={faSave} /> 
                                <span className='new-project-btn-text'>Save project</span>
                            </ButtonComponent>
                            <ButtonComponent
                                type='warning'
                                className='generate-project-btn'
                                onClick={this.generateProject}>
                                <FontAwesomeIcon icon={faDownload} />
                                <span className='new-project-btn-text'>Generate project</span>
                            </ButtonComponent>
                            <ButtonComponent
                                type='success'
                                className='generate-project-btn'
                                onClick={this.handleDeployProject}>
                                <FontAwesomeIcon icon={faArrowAltCircleUp} />
                                <span className='new-project-btn-text'>Deploy project</span>
                            </ButtonComponent>
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
                        handleDropComponent={this.handleDropComponent}
                        componentDragStart={this.componentDragStart}
                        rearangeComponents={this.rearangeComponents}/>
                    <ElementToolbarComponent
                        actions={{
                            handleChangeEditMode: this.handleChangeEditMode,
                            handleForceExitEditMode: this.handleForceExitEditMode,
                            handleDeleteComponent: this.handleDeleteComponent
                        }}
                        component={componentInEditMode}
                        handleComponentValueChange={this.handleComponentValueChange}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.project,
        user: state.user,
        projectStatus: state.projectStatus
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            Object.assign({}, projectActions, deploymentActions),
            dispatch
        )
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(EditProjectComponent);