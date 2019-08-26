import React, { Component } from 'react';
import ProjectComponentsList from './projectDraggableComponents/ProjectComponentsList';
import ProjectPageComponent from './projectDropList/ProjectPageComponent';
import ElementToolbarComponent from './elementToolbar/ElementToolbarComponent';
import componentObjects, { componentTypes } from './components/componentTypes';
import projectGenerator from '../../service/projectGenerator.service';
import LoadingComponent from '../common/LoadingComponent';
import * as projectActions from '../../actions/projectActions';
import * as deploymentActions from '../../actions/deploymentActions';
import uuid from 'uuid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import apiService from '../../service/api.service';

import './EditProjectComponent.css';
import SaveStatus from './components/saveStatus';
import SaveStatusComponent from '../common/SaveStatusComponent';
import ProjectActionButtonsComponent from '../common/ProjectActionButtonsComponent';

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
        swapDate: new Date(),
        isInitialyLoaded: true,
        isLoading: true,
        dragContainerActive: false,
        saveStatus: SaveStatus.Saved
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
        if(props.error) {
            this.setState({ saveStatus: props.error });
        }

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

        this.setState({ saveStatus: SaveStatus.Saved });

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

        const project = Object.assign({}, this.props.project);
        projectGenerator.generateProject(project.name, pages, project.projectImageUrl);
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

        this.setState({ droppedComponents, saveStatus: SaveStatus.Updated });
    }

    findChildByIndex = (components, index) => {
        const children = [];
        components.filter(c => c.children)
            .map(c => c.children)
            .forEach(c => children.push(...c));
        if(!children.length) {
            return null;
        }

        let component = children.find((c) => c.index === index);

        return component;
    }
    handleChangeEditMode = (index) => {
        const droppedComponents = [...this.state.droppedComponents];

        // const component = Object.assign({}, droppedComponents[0]);
        // component.isInEditMode = true;

        // droppedComponents[0] = component;

        let foundComponentIndex = droppedComponents.findIndex(c => c.index === index);
        debugger;
        if(foundComponentIndex === -1) {
            let childIndex = -1;
            const componentIndex = droppedComponents
            .findIndex(c => {
                debugger;
                const cIndex = c.children.findIndex(child => child.index === index);
                if(cIndex !== -1) {
                    childIndex = cIndex;
                    return true;
                }

                return false;
            });
            if(componentIndex !== -1 && childIndex !== -1) {
                const component = Object.assign({}, droppedComponents[componentIndex]);
                const child = Object.assign({}, component.children[childIndex]);
                child.isInEditMode = !child.isInEditMode;
                component.children[childIndex] = child;
                droppedComponents[componentIndex] = component;
            }
        } else {
            const component = Object.assign({}, droppedComponents[foundComponentIndex]);
            component.isInEditMode = 
                !component.isInEditMode;
            
            droppedComponents[foundComponentIndex] = component;
            droppedComponents.forEach((component) => {
                if(component.index !== index) {
                    component.isInEditMode = false;
                }
            });
            
            if(droppedComponents[foundComponentIndex].isInEditMode) {
                this.setState({ dragContainerActive: false });
            }
        }
        

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

        this.setState({ 
            droppedComponents,
            previousComponent: {},
            saveStatus: SaveStatus.Updated
        });
    }

    handleDeleteComponent = (index) => {
        let droppedComponents = this.state.droppedComponents;
        const deleteComponentIndex = droppedComponents.findIndex(c => c.index === index);
        if(deleteComponentIndex !== -1) {
            let childIndex = -1;
            const componentIndex = droppedComponents
            .findIndex(c => {
                debugger;
                const cIndex = c.children.findIndex(child => child.index === index);
                if(cIndex !== -1) {
                    childIndex = cIndex;
                    return true;
                }

                return false;
            });

            if(componentIndex !== -1 && childIndex !== -1) {
                const component = Object.assign({}, droppedComponents[componentIndex]);
                component.children.splice(childIndex, 1);
                droppedComponents[componentIndex] = index;
            }
        } else {
            let i = 0;
            for(i = 0; i < droppedComponents.length; i++) {
                const foundComponent = droppedComponents[i];
                if(!foundComponent.children) {
                    continue;
                }

                const childIndex = foundComponent.children
                    .findIndex(child => child.index === index);
                if(childIndex === -1) {
                    continue;
                }

                foundComponent.children.splice(childIndex, 1);

                droppedComponents[i] = foundComponent;
                break;
            }
        }

        this.setState({ droppedComponents, previousComponent: {}, saveStatus: SaveStatus.Updated });
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

        if(index !== -1) {
            droppedComponents[index] = componentInEditMode;
        } else {
            // Update child after changed is made
            let childIndex = -1;
            const componentIndex = droppedComponents
                .findIndex(c => {
                    if(!c.children) {
                        return false;
                    }
                    return c.children.find((child, i) => {
                        if(child.index === componentInEditMode.index) {
                            childIndex = i;
                            return true;
                        }

                        return false;
                    });
                });

            const editedComponent = droppedComponents[componentIndex];
            editedComponent.children[childIndex] = componentInEditMode;
            droppedComponents[componentIndex] = editedComponent;
        }

        this.setState({ droppedComponents, saveStatus: SaveStatus.Updated });
    }

    handleComponentImageChange = async (event) => {
        const target = event.target;
        if (!target.files || !target.files[0]) {
            return;
        }

        const file = target.files[0];
        const formData = new FormData();
        formData.append('image', file, file.name);

        try {
            const res = await apiService.uploadImage(formData);
            this.handleComponentValueChange(res.data.data.link, 'src');
        } catch(error) {
            console.log(error);
        }
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

        this.setState({ page, saveStatus: SaveStatus.Saved });
        
        this.props.actions.updateProject(this.state.id, pages, token);
    }

    handleDeployProject = async () => {
        this.props.actions.deployProject(this.state.id, this.props.user.token);
    }
    getComponentInEditMode = () => {
        let index = -1;
        const droppedComponents = this.state.droppedComponents;
        let component = droppedComponents.find((c, i) => {
            if(c.isInEditMode) {
                index = i;
            }

            return c.isInEditMode;
        });

        if(!component) {
            const children = [];
            droppedComponents.filter(c => c.children)
                .map(c => c.children)
                .forEach(c => children.push(...c));

            component = children.find((c) => c.isInEditMode);
        }

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
        const droppedComponents = [...this.state.droppedComponents];
        const componentIndex = droppedComponents.findIndex(d => d.index === index);
        const copyOfComponent = Object.assign({}, droppedComponents[componentIndex]);
        const style = Object.assign({}, copyOfComponent.style);
        style.border = '2px solid #e53b52';
        copyOfComponent.style = style;

        droppedComponents[componentIndex] = copyOfComponent

        this.setState({ draggedComponentIndex: index, droppedComponents });
    }

    componentDragEnd = () => {
        const droppedComponents = [...this.state.droppedComponents];
        const componentIndex = droppedComponents
            .findIndex(d => d.index === this.state.draggedComponentIndex);
        const copyOfComponent = Object.assign({}, droppedComponents[componentIndex]);
        const style = Object.assign({}, copyOfComponent.style);
        delete style.border;
        copyOfComponent.style = style;

        droppedComponents[componentIndex] = copyOfComponent

        this.setState({ draggedComponentIndex: '', droppedComponents });
    }

    rearangeComponents = (event) => {
        const dropIndex = event.nativeEvent.target.id;
        const draggedComponentIndex = this.state.draggedComponentIndex;
        const timeDifference = new Date().getTime() - this.state.swapDate.getTime();
        if(dropIndex === draggedComponentIndex || timeDifference < 1000) {
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

        this.setState({
            droppedComponents,
            swapDate: new Date(),
            saveStatus: SaveStatus.Updated
        });
    }

    handleDropContainerComponent = (event, nativeEvent, index) => {
        nativeEvent.stopPropagation();
        const draggableComponents = [...this.state.draggableComponents];
        const foundElement = draggableComponents
            .find((draggableComponent) => draggableComponent.name === event.component);
        foundElement.index = uuid.v1();
        const droppedComponent = Object.assign({}, foundElement);
        const droppedComponents = [...this.state.droppedComponents];
        const containerIndex = droppedComponents.findIndex((c) => c.index === index);
        const container = Object.assign({}, droppedComponents[containerIndex]);

        container.children.push(droppedComponent);
        droppedComponents[containerIndex] = container;

        this.setState({ droppedComponents });
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingComponent message='Fetching project' />;
        }

        const { componentInEditMode } = this.getComponentInEditMode();
        return (
            <div>
                <h1 className='project-name-header'>
                    {this.props.project.name} <SaveStatusComponent saveStatus={this.state.saveStatus}/>
                </h1>
                <button 
                    className='draggable-container-btn' 
                    onClick={() => {
                        if(componentInEditMode) {
                            return
                        };

                        this.setState({
                            dragContainerActive: !this.state.dragContainerActive
                        })}
                    }>
                    {this.state.dragContainerActive ? 'Hide': 'Show'}
                </button>
                <ProjectActionButtonsComponent
                    returnFunction={this.returnToRouting}
                    returnFunctionText='Back to pages'
                    handleSaveProject={this.handleSaveProject}
                    generateProject={this.generateProject}
                    handleDeployProject={this.handleDeployProject}/>
                <div className="drag-drop-container">
                    <ProjectComponentsList
                        active={this.state.dragContainerActive}
                        draggableComponents={this.state.draggableComponents}/>
                    <ProjectPageComponent
                        componentInEditMode={componentInEditMode ? true : false}
                        handleComponentValueChange={this.handleComponentValueChange}
                        handleChangeEditMode={this.handleChangeEditMode}
                        handleForceExitEditMode={this.handleForceExitEditMode}
                        droppedComponents={this.state.droppedComponents}
                        handleDropComponent={this.handleDropComponent}
                        componentDragStart={this.componentDragStart}
                        componentDragEnd={this.componentDragEnd}
                        handleDropContainerComponent={this.handleDropContainerComponent}
                        rearangeComponents={this.rearangeComponents}/>
                    <ElementToolbarComponent
                        actions={{
                            handleChangeEditMode: this.handleChangeEditMode,
                            handleForceExitEditMode: this.handleForceExitEditMode,
                            handleDeleteComponent: this.handleDeleteComponent
                        }}
                        component={componentInEditMode}
                        handleComponentValueChange={this.handleComponentValueChange}
                        handleComponentImageChange={this.handleComponentImageChange}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.project,
        user: state.user,
        projectStatus: state.projectStatus,
        error: state.error
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