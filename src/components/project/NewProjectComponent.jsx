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
    onDrop(data) {
        console.log(data)
    }

    handleDropComponent = (event) => {
        const draggableComponents = this.state.draggableComponents;
        const componentElement = draggableComponents
            .find((draggableComponent) => draggableComponent.name === event.component);
        const droppedComponents = this.state.droppedComponents;
        droppedComponents.push(componentElement);

        this.setState({draggableComponents, droppedComponents});
    }
    render() {
        return (
            <div>
                <ProjectComponentsList 
                    draggableComponents={this.state.draggableComponents}/>
                <ProjectPageComponent
                    droppedComponents={this.state.droppedComponents}
                    handleDropComponent={this.handleDropComponent}/>
            </div>
        );
    }
}
 
export default NewProjectComponent;