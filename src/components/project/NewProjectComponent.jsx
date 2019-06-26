import React, { Component } from 'react';
import ProjectComponentsList from './projectDraggableComponents/ProjectComponentsList';
import ProjectPageComponent from './projectDropList/ProjectPageComponent';
import './NewProjectComponent.css';
import componentTypes from './components/componentTypes';
import projectGenerator from '../../service/projectGenerator.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSave } from '@fortawesome/free-solid-svg-icons';

class NewProjectComponent extends Component {
    state = {
        name: '',
        draggableComponents: componentTypes,
        droppedComponents: [],
        newIndex: 0,
        previousInnerText: ''
    }

    generateProject = () => {
        projectGenerator.generateProject(this.state.name, this.state.droppedComponents);
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

    handleChangeProjectName = (event) => {
        this.setState({ name: event.target.value });
    }

    handleSaveProject = () => {
        //TO DO: Make request for saving current project state
        alert('To be implement');
    }

    render() {
        return (
            <div>
                <div className='new-project-name-outer-container'>
                    <div className='new-project-name-inner-container'>
                        <label>Project name</label>
                        <input
                            className='new-project-name-input'
                            placeholder='Add name here'
                            value={this.state.name}
                            onChange={this.handleChangeProjectName}/>
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
                        handleChangeTextDroppedComponent={this.handleChangeTextDroppedComponent}
                        handleChangeEditMode={this.handleChangeEditMode}
                        handleForceExitEditMode={this.handleForceExitEditMode}
                        droppedComponents={this.state.droppedComponents}
                        handleDropComponent={this.handleDropComponent}/>
                </div>
            </div>
        );
    }
}
 
export default NewProjectComponent;