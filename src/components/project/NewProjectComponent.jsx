import React, { Component } from 'react';
import ProjectComponentsList from './projectDraggableComponents/ProjectComponentsList';
import ProjectPageComponent from './projectDropList/ProjectPageComponent';
import './NewProjectComponent.css';
import componentTypes from './components/componentTypes';

class NewProjectComponent extends Component {
    state = {
        draggableComponents: componentTypes,
        droppedComponents: [],
        newIndex: 0
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
        debugger;
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
                        handleChangeEditMode={this.handleChangeEditMode}
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