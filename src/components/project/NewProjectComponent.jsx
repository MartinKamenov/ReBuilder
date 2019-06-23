import React, { Component } from 'react';
import ProjectComponentsList from './projectComponents/ProjectComponentsList';
import ProjectPageComponent from './projectDropList/ProjectPageComponent';
import './NewProjectComponent.css';
import componentTypes from './components/componentTypes';

class NewProjectComponent extends Component {
    state = {
        draggableComponents: componentTypes
    }
    onDrop(data) {
        console.log(data)
    }
    render() {
        return (
            <div>
                <ProjectComponentsList 
                    draggableComponents={this.state.draggableComponents}/>
                <ProjectPageComponent/>
                {/* <Droppable
                    types={['fruit']} // <= allowed drop types
                    onDrop={this.onDrop.bind(this)}>
                    <ul className="Smoothie">
                        <p>1</p>
                    </ul>
                </Droppable> */}
            </div>
        );
    }
}
 
export default NewProjectComponent;