import React, { Component } from 'react';
import ProjectComponentsList from './projectDraggableComponents/ProjectComponentsList';
import ProjectPageComponent from './projectDropList/ProjectPageComponent';
import './NewProjectComponent.css';
import componentTypes from './components/componentTypes';

class NewProjectComponent extends Component {
    state = {
        draggableComponents: componentTypes,
        droppedComponents: []
    }

    generateProject = () => {
        const element = document.createElement("a");
        const file = new Blob(['text'], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.zip";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    handleDropComponent = (event) => {
        const draggableComponents = this.state.draggableComponents;
        const componentElement = draggableComponents
            .find((draggableComponent) => draggableComponent.name === event.component);
        const droppedComponents = this.state.droppedComponents;
        componentElement.innerText = componentElement.name;
        componentElement.isInEditMode = false;
        droppedComponents.push(componentElement);

        this.setState({droppedComponents});
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
                        droppedComponents={this.state.droppedComponents}
                        handleDropComponent={this.handleDropComponent}/>
                </div>
                <button 
                    className='btn btn-success'
                    onClick={this.generateProject}>
                    Build project
                </button>
            </div>
        );
    }
}
 
export default NewProjectComponent;