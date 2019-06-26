import React, { Component } from 'react';
import ProjectComponentsList from './projectDraggableComponents/ProjectComponentsList';
import ProjectPageComponent from './projectDropList/ProjectPageComponent';
import './NewProjectComponent.css';
import componentTypes from './components/componentTypes';
import projectGenerator from '../../service/projectGenerator.service';

class NewProjectComponent extends Component {
    state = {
        name: 'Project name',
        draggableComponents: componentTypes,
        droppedComponents: [],
        newIndex: 0,
        previousInnerText: ''
    }

    generateProject = () => {
        projectGenerator.generateProject(this.state.droppedComponents);
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

        this.setState({droppedComponents});
    }

    handleForceExitEditMode = (index) => {
        const droppedComponents = this.state.droppedComponents;
        droppedComponents[index].isInEditMode = false;
        droppedComponents[index].innerText = this.state.previousInnerText;

        this.setState({droppedComponents, previousInnerText: ''});
    }

    handleChangeTextDroppedComponent = (newText, index) => {
        const droppedComponents = this.state.droppedComponents;
        droppedComponents[index].innerText = newText;

        this.setState({ droppedComponents });
    }
    render() {
        return (
            <div>
                <div className="drag-drop-container">
                    <ProjectComponentsList
                        draggableComponents={this.state.draggableComponents}/>
                    <ProjectPageComponent
                        handleChangeTextDroppedComponent={this.handleChangeTextDroppedComponent}
                        handleChangeEditMode={this.handleChangeEditMode}
                        handleForceExitEditMode={this.handleForceExitEditMode}
                        droppedComponents={this.state.droppedComponents}
                        handleDropComponent={this.handleDropComponent}/>
                </div>
                <button 
                    className='btn btn-success'
                    onClick={this.generateProject}>
                    Generate project
                </button>
            </div>
        );
    }
}
 
export default NewProjectComponent;